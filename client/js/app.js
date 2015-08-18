/* global $ */

$(function () {
  window.addEventListener('load', function () {
    window.FastClick(document.body)
  }, false)

  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade')
  })

  if ($('form#create').length) {

    $('#create-date').pickadate({
      format: 'ddd dd mmm, yyyy',
      selectYears: false,
      firstDay: true,
      min: window.moment().add(1, 'hour').toDate(),
      max: window.moment().add(2, 'months').toDate()
    })
    $('#create-time').pickatime({
      format: 'HH:i',
      formatLabel: 'HH:i'
    })

    var xhr2 = !!(window.FormData && ('upload' in ($.ajaxSettings.xhr())))
    if (!xhr2) {
      $('#js-slots-sqm').addClass('disabled')
    } else {

      var fileForm = $('#js-form-upload-file')
      var sqmFileInput = $('#js-input-file-sqm')
      var sqmUploadBtn = $('#js-slots-btn-sqm')
      var errorContainer = $('#js-sqm-error')

      var resetFileInput = function () {
        // Resets the input
        sqmFileInput.wrap('<form>').closest('form').get(0).reset()
        sqmFileInput.unwrap()
      }

      var printSqmError = function (msg) {
        if (!msg) return
        errorContainer.find('p').html(msg)
        errorContainer.removeClass('hidden')
      }

      sqmUploadBtn.click(function (e) {
        e.preventDefault()
        errorContainer.addClass('hidden')
        $('#js-input-file-sqm').click()
      })

      sqmFileInput.change(function () {
        var file = this.files[0]
        if (!file) return
        if (file.size / (1024 * 2) > 3) {
          resetFileInput()
          return printSqmError('File exceeds limit (3mb)')
        }
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
          resetFileInput()
          sqmUploadBtn.removeClass('disabled loading')
        })
        return false
      })
    }
  }
})
