/* global $ */
$(function () {
  window.addEventListener('load', function () {
    window.FastClick(document.body)
  }, false)

  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade')
  })
})
