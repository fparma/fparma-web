(function ($) {
  $(window).load(function () {
    window.FastClick(window.document.body)
    if (!window.Cookies.get('cookies_consent')) {
      $('#cookies').removeClass('invis')
      .hide()
      .fadeIn()
      .on('click', '.button', function () {
        window.Cookies.set('cookies_consent', true, {expires: 180})
        $('#cookies').fadeOut()
      })
    }
  })

  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade')
  })

  $('.ui.dropdown').dropdown()

  // Shows a group description
  $('.event-group .grp-desc').popup()

  $('#js-date-select').on('change', function () {
    var val = this.value
    $('.js-event-date').each(function () {
      var $date = $(this)
      if (val === 'utc') return $date.html($date.attr('data-def'))
      var time = window.moment($date.attr('data-date').replace(/"/g, ''))
      if (val === 'local') return $date.html(time.format('YYYY-MMM-DD, HH:mm'))
      if (val === 'from_now') return $date.html(time.fromNow())
    })
  })

  !(function () {
    if (!($('#squad-form').length)) return
    $('button[type="submit"]').click(function () {
      $(this).addClass('disabled loading')
    })
    $('#squad-form').form({
      inline: true,
      fields: {
        nick: {
          rules: [{type: 'maxLength[64]', prompt: 'Max 64 characters'}]
        },
        remark: {
          rules: [{type: 'maxLength[128]', prompt: 'Max 128 characters'}]
        }
      }
    })

    var squadSettings = $('.js-squad')
    if (squadSettings.hasClass('invis')) {
      squadSettings.hide().removeClass('invis').attr('disabled', true)
    }

    $('#squad-xml-accept').on('click', function () {
      squadSettings.fadeToggle({
        duration: 200,
        complete: function () {
          var $this = $(this)
          $this.find('input').attr('disabled', $this.is(':hidden'))
        }
      })
    })
  })()

  !(function () {
    if (!$('#event-description').length) return
    var $date = $('#js-date')
    var date = $date.attr('data-date').replace(/['"]+/g, '')
    var local = window.moment(date).format('YYYY-MMM-DD, HH:mm')
    var utc = window.moment.utc(date).format('YYYY-MMM-DD, HH:mm')
    $date.html(local)

    $('#js-date-checkbox').on('change', function (e) {
      $date.html(e.target.checked ? utc : local)
    })
  }())

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

/*! js-cookie v2.0.3 | MIT */
/*eslint-disable */
!function(a){if("function"==typeof define&&define.amd)define(a);else if("object"==typeof exports)module.exports=a();else{var b=window.Cookies,c=window.Cookies=a(window.jQuery);c.noConflict=function(){return window.Cookies=b,c}}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g;if(arguments.length>1){if(f=a({path:"/"},d.defaults,f),"number"==typeof f.expires){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h}try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(i){}return e=encodeURIComponent(String(e)),e=e.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(String(b)),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape),document.cookie=[b,"=",e,f.expires&&"; expires="+f.expires.toUTCString(),f.path&&"; path="+f.path,f.domain&&"; domain="+f.domain,f.secure?"; secure":""].join("")}b||(g={});for(var j=document.cookie?document.cookie.split("; "):[],k=/(%[0-9A-Z]{2})+/g,l=0;l<j.length;l++){var m=j[l].split("="),n=m[0].replace(k,decodeURIComponent),o=m.slice(1).join("=");'"'===o.charAt(0)&&(o=o.slice(1,-1));try{if(o=c&&c(o,n)||o.replace(k,decodeURIComponent),this.json)try{o=JSON.parse(o)}catch(i){}if(b===n){g=o;break}b||(g[n]=o)}catch(i){}}return g}return d.get=d.set=d,d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b()});
/*eslint-enable */
