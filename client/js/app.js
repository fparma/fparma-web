/* global $ */

$(function () {
  window.addEventListener('load', function () {
    window.FastClick(document.body)
  }, false)

  if ($('form#create').length) {

    $('#create-date').pickadate()
    $('#create-time').pickatime({
      format: 'h:i A',
      formatLabel: '<b>h</b>:i <!i>A</!i>'
    })

    var xhr2 = !!(window.FormData && ('upload' in ($.ajaxSettings.xhr())))
    if (!xhr2) {
      $('#js-slots-sqm').addClass('disabled')
    } else {

      var errorContainer = $('#js-sqm-error')
      var fileForm = $('#js-form-upload-file')
      var sqmUploadBtn = $('#js-slots-btn-sqm')
      var sqmFileInput = $('#js-input-file-sqm')

      var printSqmError = function (msg) {
        if (!msg) return
        errorContainer.html(msg).removeClass('hidden')
      }

      sqmUploadBtn.click(function (e) {
        e.preventDefault()
        errorContainer.addClass('hidden')
        $('#js-input-file-sqm').click()
      })

      sqmFileInput.change(function () {
        var file = this.files[0]
        if (!file) return printSqmError('No file selected')
        if ((file.size / 1024 / 1024) > 3) return printSqmError('File exceeds limit (3mb)')
        sqmUploadBtn.addClass('loading disabled')
        fileForm.submit()
      })

      fileForm.submit(function (e) {
        e.preventDefault()
        var formData = new window.FormData($(this)[0])

        $.ajax({
          url: '/events/create/upload-sqm',
          type: 'POST',
          data: formData,
          cache: false,
          contentType: false,
          processData: false
        }).success(function (reply) {
          if (!reply.ok) return printSqmError(reply.error)
          console.log(reply.data)
        }).always(function () {
          // Resets the input
          sqmFileInput.wrap('<form>').closest('form').get(0).reset()
          sqmFileInput.unwrap()
          sqmUploadBtn.removeClass('disabled loading')
        })
        return false
      })
    }
  }
})
