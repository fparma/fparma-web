(function ($) {

  $(window).load(function () {
    window.FastClick(window.document.body)
  })

  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade')
  })

})(window.jQuery)
