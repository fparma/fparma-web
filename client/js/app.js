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

  var isBusy = false
  $('#js-event-slots').on('click', '.js-slot', function () {
    if (isBusy) return
    isBusy = true
    var $itemSlot = $(this)
    var data = {
      eventId: $('#js-event-id').val(),
      slotId: $itemSlot.attr('data-id')
    }

    $.ajax({
      url: '/events/slot-assign',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
    .success(function (response) {
      if (!response.ok) {
        var msg = $('<div class="ui pointing red tiny label">' + response.error + '</div>')
        $itemSlot.find('.content').append(msg)
        setTimeout(function () {
          msg.remove()
          isBusy = false
        }, 3000)
        return
      }

      // TODO: maybe client render instead
      if (response.data) {
        window.location.reload()
      }
    })
  })
})(window.jQuery)
