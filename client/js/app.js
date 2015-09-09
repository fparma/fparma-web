(function ($) {
  $(window).load(function () {
    window.FastClick(window.document.body)
  })

  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade')
  })

  $('.ui.dropdown').dropdown()

  var $dateSelect = $('#js-date-select')
  $dateSelect.on('change', function (e) {
    var val = this.value
    $('.js-event-date').each(function () {
      var $this = $(this)
      if (val === 'utc') return $this.html($this.attr('data-def'))
      var time = window.moment($this.attr('data-date').replace(/"/g, ''))
      if (val === 'local') return $this.html(time.format('YYYY-MMM-DD, HH:mm'))
      if (val === 'from_now') return $this.html(time.fromNow())
    })
  })
/*
    var $this = $(this)
    if ($this.hasClass('active')) return
    $dateSelect.find('.active').removeClass('active')
    $this.addClass('active')

    var val = $this.attr('data-value')
    $this.find('option').each(function () {
      var $this = $(this)
      if (val === 'utc') return $this.html($this.attr('data-def'))
      var time = window.moment($this.attr('data-date').replace(/"/g, ''))
      if (val === 'local') return $this.html(time.format('YYYY-MMM-DD, HH:mm'))
      if (val === 'from_now') return $this.html(time.fromNow())
    })
  })*/
})(window.jQuery)
