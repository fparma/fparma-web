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
      $('#upload').addClass('disabled')
    } else {
      $('#sqm').click(function (e) {
        e.preventDefault()
        $('#sqm').addClass('disabled loading')
        $('#upload').click()
      })

      $('#upload').change(function () {
        var fileUpload = $(this)
        var sqmButton = $('#sqm')

        var file = fileUpload.prop('files')[0]
        if (!file) return sqmButton.removeClass('disabled loading')

        var data = new window.FormData()
        data.append('file', file)

        $.ajax({
          url: '/events/create/upload-sqm',
          type: 'POST',
          contentType: false,
          data: data,
          processData: false,
          cache: false
        }).error(function (response) {
          console.log(response)
        }).success(function (response) {
          console.log(response)
        }).always(function () {
          fileUpload.replaceWith(fileUpload.clone(true))
          sqmButton.removeClass('disabled loading')
        })
      })
    }
  }
})
