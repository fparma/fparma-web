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

  var isBusy
  $('#js-event-slots').on('click', '.js-claim-slot', function () {
    if (isBusy) return
    isBusy = true
    var $this = $(this)
    $this.removeClass('add green user').addClass('notched circle loading')
    var data = {
      eventId: $('#js-event-id').val(),
      slotId: $this.attr('data-id')
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
        $this.addClass('js-claim-slot green add user')
        .next('.content').append(msg)
        setTimeout(function () {
          msg.remove()
        }, 3000)
        return
      }
      /*
      var data = response.data
      if (data.removed) {
        $('.js-taken-slot[data-id="' + data.removed._id + '"]')
        .parent().empty().append($(
          '<i class="js-claim-slot middle aligned green add user icon link" data-id="' + data.removed._id + '" title="Claim slot"></i>' +
          '<div class="content"><div class="header">' + data.removed.description + '</div></div>')
        )
      }

      if (data.taken) {
        $this
        .removeClass('js-claim-slot is-busy green add user link')
        .addClass('js-taken-slot grey user')
        .next('.content')
        .append($('<div class="description">' + data.taken.user_name + '</div>'))
      }*/
    })
    .always(function () {
      isBusy = false
      $this.removeClass('notched circle loading')
    })

  })
})(window.jQuery)
