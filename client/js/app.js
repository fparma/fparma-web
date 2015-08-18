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

    if (!window.FileReader) {
      $('#js-slots-sqm').addClass('disabled')
    } else {
      var errorContainer = $('#js-sqm-error')
      var originalUpload = $('#js-sqm-upload').clone(true)
      var sqmUploadBtn = $('#js-slots-sqm')

      var printSqmError = function (msg) {
        errorContainer.html(msg).removeClass('hidden')
        onDoneReading()
      }

      var onDoneReading = function (result) {
        $.ajax('/events/create/upload-sqm', {
          data: JSON.stringify({sqm: result}),
          contentType: 'application/json',
          type: 'POST'
        }).error(function (response) {
          console.log(response)
        }).success(function (response) {
          console.log(response)
        }).always(function () {
          sqmUploadBtn.removeClass('disabled loading')
          originalUpload.replaceWith(originalUpload)
        })
      }

      sqmUploadBtn.click(function (e) {
        e.preventDefault()
        errorContainer.html('').addClass('hidden')
        $('#js-sqm-upload').click()
      })

      $('#js-sqm-upload').change(function () {
        sqmUploadBtn.addClass('loading disabled')
        var file = this.files[0]
        if (!file) return printSqmError('No file selected')
        if ((file.size / 1024 / 1024) > 100) return printSqmError('File exceeds limit (3mb)')

        var reader = new window.FileReader()
        reader.onload = function () {
          onDoneReading(reader.result)
        }
        reader.onerror = function (e) {
          printSqmError(e ? e.message : 'Error reading file')
          onDoneReading()
        }

        reader.readAsText(file)
      })
    }
/*
    var xhr2 = !!(window.FormData && ('upload' in ($.ajaxSettings.xhr())))
    if (!xhr2) {
      $('#js-slots-sqm').addClass('disabled')
    } else {
      var originalUpload = $('#js-sqm-upload').clone(true)

      $('#js-slots-sqm').click(function (e) {
        e.preventDefault()
        $('#js-sqm-upload').click()
      })

      $('#js-sqm-upload').change(function () {
        var fileUpload = $(this)
        var sqmButton = $('#js-slots-sqm')
        sqmButton.addClass('disabled loading')

        var file = fileUpload.prop('files')[0]
        if (!file) {
          fileUpload.replaceWith(originalUpload)
          return sqmButton.removeClass('disabled loading')
        }

        var formData = new window.FormData()
        formData.append('file', file)

        $.ajax({
          url: '/events/create/upload-sqm',
          type: 'POST',
          contentType: false,
          data: formData,
          processData: false,
          cache: false
        }).error(function (response) {
          console.log(response)
        }).success(function (response) {
          console.log(response)
        }).always(function () {
          fileUpload.replaceWith(originalUpload)
          sqmButton.removeClass('disabled loading')
        })
      })
    }
*/
  }
})
