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
  $('#js-event-slots').on('click', '.js-slot-reserve', function () {
    handleSlot(this, 'slot-reserve')
  })

  $('#js-event-slots').on('click', '.js-slot-unreserve', function () {
    handleSlot(this, 'slot-unreserve')
  })

  $('#js-event-slots').on('click', '.js-slot-kick', function () {
    handleSlot(this, 'slot-kick')
  })

  function handleSlot (el, endpoint) {
    if (isBusy) return
    isBusy = true
    var $itemSlot = $(el)
    var data = {
      eventId: $('#js-event-id').val(),
      slotId: $itemSlot.parentsUntil('.list', '.js-slot-item').attr('data-id')
    }

    $.ajax({
      url: '/events/' + endpoint,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
    .success(function (response) {
      if (!response.ok) {
        var msg = $('<div class="ui pointing red tiny label">' + response.error + '</div>')
        $itemSlot.parent().parent().find('.content:not(.floated)').append(msg)
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
  }
})(window.jQuery)
