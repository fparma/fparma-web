(function ($) {
  $(window).load(function () {
    window.FastClick(window.document.body)
  })

  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade')
  })

  $('.ui.dropdown').dropdown()

  !(function () {
    var $dateSelect = $('#js-date-select')
    if (!$dateSelect.length) return
    $dateSelect.on('change', function () {
      var val = this.value
      $('.js-event-date').each(function () {
        var $date = $(this)
        if (val === 'utc') return $date.html($date.attr('data-def'))
        var time = window.moment($date.attr('data-date').replace(/"/g, ''))
        if (val === 'local') return $date.html(time.format('YYYY-MMM-DD, HH:mm'))
        if (val === 'from_now') return $date.html(time.fromNow())
      })
    })
  })()

  !(function () {
    var $eventSlotsForm = $('#js-event-slots')
    if (!$eventSlotsForm.length) return

    var isBusy = false
    var handleSlotBtnClick = function handleSlotBtnClick (el, endpoint) {
      if (isBusy) return
      isBusy = true

      var $itemSlot = $(el).parentsUntil('.list', '.js-slot-item')
      var data = {
        eventId: $('#js-event-id').val(),
        slotId: $itemSlot.attr('data-id')
      }

      $.ajax({
        url: '/events/' + endpoint,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data)
      })
      .success(function (response) {
        if (response.ok) return window.location.reload()

        var msg = $('<div class="ui pointing red tiny label">' + response.error + '</div>')
        $itemSlot.find('.content:not(.floated)').append(msg)
        setTimeout(function () {
          msg.remove()
          isBusy = false
        }, 3000)
      })
    }

    $eventSlotsForm.on('click', '.js-slot-reserve', function () {
      handleSlotBtnClick(this, 'slot-reserve')
    })

    $eventSlotsForm.on('click', '.js-slot-unreserve', function () {
      handleSlotBtnClick(this, 'slot-unreserve')
    })

    $eventSlotsForm.on('click', '.js-slot-kick', function () {
      handleSlotBtnClick(this, 'slot-kick')
    })
  })()
})(window.jQuery)
