
(function ($) {
  function isMobile () {
    return $('nav .mobile-only').is(':visible')
  }

  $(window).load(function () {
    window.FastClick.attach(window.document.body)
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

  $('.ui.dropdown:not("#log-search")').dropdown()

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
    var root = $('#media-screenshots')
    if (!root.length) return

    root.find('.row').addClass('invis').hide()
    var loader = root.find('.segment.loading').removeClass('invis').hide()

    var prepareAndLoadImage = function (imgEl) {
      var dfd = $.Deferred()
      imgEl.data('caption', imgEl.attr('data-caption'))
      imgEl.attr('author', imgEl.attr('data-author'))

      var done = function () {
        if (imgEl.get(0).complete === true) {
          imgEl.addClass('loaded')
        }
        if (dfd.state() === 'pending') dfd.resolve(imgEl)
      }

      imgEl.load(done)
      window.setTimeout(done, 5000)

      imgEl.on('error', function () {
        imgEl.parentsUntil('.row').remove()
        imgEl.remove()
        if (dfd.state() === 'pending') dfd.resolve(null)
      })

      imgEl.attr('src', imgEl.attr('href'))
      return dfd.promise()
    }

    var prepareRows = function (amountRows) {
      var dfds = []
      root.find('.row.invis').each(function (i) {
        var $row = $(this)
        var rowImages = $row.find('img')
        if (!rowImages.length) return false

        var loaded = 0
        var dfd = $.Deferred()
        dfds.push(dfd.promise())
        $row.removeClass('invis')

        rowImages.each(function () {
          prepareAndLoadImage($(this)).then(function (img) {
            loaded++
            if (loaded >= rowImages.length) {
              dfd.resolve($row)
            }
          })
        })
        if (i >= (amountRows - 1)) return false
      })

      return $.when.apply($, dfds)
    }

    var loadMoreRows = function (amountRows, isFirstLoad) {
      var dfd = $.Deferred()
      loader.fadeToggle()

      prepareRows(amountRows).then(function () {
        var args = [].slice.call(arguments)
        if (!args.length) {
          loader.fadeToggle()
          return dfd.resolve(0)
        }

        var remainingRows = root.find('.row.invis').length
        if (!root.is(':visible')) {
          $.each(args, function () {
            $(this).show()
          })
          loader.hide()
          return dfd.resolve(remainingRows)
        }

        var run = function () {
          var i = 0
          var enough = (!isFirstLoad || isMobile()) ? 1 : 3

          var next = function () {
            if (i++ >= enough) {
              $.each(args, function () {
                $(this).show()
              })
              return dfd.resolve(remainingRows)
            }

            var cur = $(args.shift())
            if (!cur.length) return dfd.resolve(remainingRows)

            cur.transition('slide down', {
              duration: 150 + (Math.random() * 200),
              onComplete: next
            })
          }
          next()
        }

        loader.fadeToggle({
          complete: run
        })
      })
      return dfd.promise()
    }

    var LOAD_MORE_AMOUNT = isMobile() ? 2 : 5
    loadMoreRows(LOAD_MORE_AMOUNT, true).then(function () {

      root.featherlightGallery({
        beforeOpen: function (e) {
          if (isMobile() && e.target) {
            e.stopPropagation()
            window.open(e.target.src)
            return false
          }
        },
        beforeContent: function () {
          this.$instance.find('.text-container').fadeOut('fast')
        },
        afterContent: function () {
          var $this = this.$currentTarget
          var $container = this.$instance.find('.text-container')
          var caption = $this.data('caption')
          var author = $this.data('author')

          $container.find('.caption').text(caption ? '"' + caption + '"' : '')
          $container.find('.author').text(author ? 'Submitted by ' + author : '')
          if (caption || author) $container.fadeIn('fast')
        }
      })

      // Scroll down - load more.
      // waypoint doesn't like divs that can can be hidden, use parent
      if (!root.find('.row.invis').length) return
      root.parent().waypoint(function (direction) {
        if (root.is(':animated') || !root.is(':visible')) return
        if (direction === 'down') {
          var self = this
          self.disable()

          loadMoreRows(LOAD_MORE_AMOUNT, false).then(function (remainingRows) {
            if (!remainingRows) return
            window.Waypoint.refreshAll()
            self.enable()
          })
        }
      }, {
        offset: 'bottom-in-view'
      })
    })
  })()

  !(function () {
    var rootVideos = $('#media-videos')
    if (!rootVideos.length) return
    var rootScreenshots = $('#media-screenshots')
    rootVideos.hide().removeClass('invis')

    var blocked = false
    var firstVideosLoaded = false
    var showingScreenshots = true
    var LOAD_MORE_AMOUNT = 12

    var switchDone = function () {
      blocked = false
      window.Waypoint.refreshAll()
      showingScreenshots = !showingScreenshots
    }

    var loadFirstVideos = function () {
      loadVideos()
      firstVideosLoaded = true
    }

    $('#js-load-more-videos').on('click', function () {
      loadVideos()
    })

    $('.js-media-nav').on('click', function () {
      var $this = $(this)
      if (blocked || $this.hasClass('active')) return

      blocked = true
      $this.addClass('active').siblings().removeClass('active')
      if (!firstVideosLoaded) loadFirstVideos()
      var param = {duration: 100, complete: switchDone}

      if (showingScreenshots) {
        rootScreenshots.fadeOut({
          duration: 100,
          complete: function () {
            rootVideos.fadeIn(param)
          }
        })
      } else {
        rootVideos.fadeOut({
          duration: 100,
          complete: function () {
            rootScreenshots.fadeIn(param)
          }
        })
      }
    })

    var convertInput = function (el) {
      return $(el).parent().html(el.text()).find('.ui.embed').embed({
        autoplay: true
      })
    }

    var loadVideos = function () {
      var amount = rootVideos.find('.js-video').slice(0, LOAD_MORE_AMOUNT)
      if (!amount.length) return
      blocked = true

      amount.removeClass('.js-video')
      .each(function () {
        var $this = $(this)
        var $row = $this.parentsUntil('.row').parent().removeClass('invis').hide()
        convertInput($this)
        $row.fadeIn('fast')
      })

      if (!rootVideos.find('.js-video').length) {
        $('#js-load-more-videos').addClass('disabled')
      }
      blocked = false
    }
  })()

  !(function () {
    var searchSelect = $('#log-search')
    if (!searchSelect.length) return

    var updatePath = function updatePath (id) {
      if (!id) id = $('#js-log').attr('data-log-id')
      if (window.history) {
        window.history.replaceState(null, null, '/admin/logs/' + id)
      }
    }
    updatePath()

    searchSelect.dropdown({
      fullTextSearch: true,
      onChange: function (value) {

        searchSelect.dropdown('refresh')
        var q = $.Deferred()
        searchSelect.addClass('disabled loading')
        var $log = $('#js-log')

        $log.fadeOut(function () {
          q.resolve()
        })

        $.ajax({
          url: '/admin/logs/search',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({id: value}),
          error: function () {
            q.then(function () {
              updatePath(value)
              searchSelect.removeClass('disabled loading')
              $log.show().html('<span style="color: red">Failed to load log (' + value + ')</span>')
            })
          }
        })
        .done(function (html) {
          var $html = $(html)
          q.then(function () {
            updatePath($html.attr('data-log-id'))
            $log.replaceWith(function () {
              return $html.hide().fadeIn(function () {
                searchSelect.removeClass('disabled loading')
              })
            })
          })
        })
      }
    })

    /*
    // add polling later maybe
    var getScrollPercent = function getScrollPercent () {
      var h = document.documentElement
      var b = document.body
      var st = 'scrollTop'
      var sh = 'scrollHeight'
      return Math.round(h[st]||b[st] / ((h[sh]||b[sh]) - h.clientHeight) * 100)
    }
    var logPoller = {
      _updating: false,
      _items: [],
      _tick: function (logId) {
        var self = this
        if (self._updating || self._items.length) return

        self._updating = true
        $.ajax({
          url: '/admin/logs/poll',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            id: logId,
            listAmount: $('#js-log .list > .item').length
          })
        })
        .done(function (res) {
          self._items = res.data
        })
        .always(function () {
          self._updating = false
        })
      },
      _render: function () {
        var self = this;
      },
      trackLog: function (logId) {
        var self = this
        self.stop()
        self._id = setInterval(function () {
          self._tick(logId)
        }, 10000)
      },
      stop: function () {
        clearInterval(this._id)
        this._items = []
      }
    }
    */
  })()

  !(function () {
    var $info = $('#server-info')
    if (!$info.length) return
    var onFail = function () {
      var d = $('<h4>Failed to get server info</h4>')
      $info.removeClass('loading')
      .append(d.hide().fadeIn('slow'))
    }

    $.ajax('/a3-server-data')
    .fail(onFail)
    .done(function (response) {
      if (!response.ok || !response.data) return onFail()

      var data = response.data
      var states = {
        unknown: '&nbsp;<i class="yellow help icon">&nbsp;unknown</i>',
        down: '&nbsp;<i class="red first aid icon">&nbsp;down</i>',
        waiting: '&nbsp;<i class="yellow wait icon">&nbsp;waiting</i>',
        playing: '&nbsp;<i class="green play icon">&nbsp;playing</i>'
      }

      var $div = $('<div />')
      .append('<p>Name: ' + data.name + '</p>')
      .append('<br />')
      if (data.state !== 'unknown') {
        $div.append('<p>Adress: ' + data.adress + '</p>')
      }
      $div.append('<p>State: ' + states[data.state] + '</p>')

      if (data.state === 'playing') {
        $div.append('<p>Island: ' + data.island + '</p>')
        .append('<p>Mission: ' + data.mission + '</p>')
        if (!data.players.length) $div.append('<p>Players: ' + (data.players.length) + '/' + data.maxPlayers + '</p>')
        else {
          var list = '<a style="cursor: pointer">Players: ' + data.players.length + '/' + data.maxPlayers + '</a>' +
          '<div class="ui flowing popup transition hidden">' +
          '<div class="ui small relaxed list">'
          data.players.forEach(function (v) { list += '<span class="item">' + v.time + 'h&nbsp;|&nbsp;' + v.name + '</span>' })
          list += '</div></div>'
          $div.append($(list).popup({on: 'click', position: 'bottom right'}))
        }
      }

      $info.removeClass('loading')
      .append($div.hide().fadeIn('slow'))
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

/*! js-cookie v2.0.3 | MIT */
/*eslint-disable */
!function(a){if("function"==typeof define&&define.amd)define(a);else if("object"==typeof exports)module.exports=a();else{var b=window.Cookies,c=window.Cookies=a(window.jQuery);c.noConflict=function(){return window.Cookies=b,c}}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g;if(arguments.length>1){if(f=a({path:"/"},d.defaults,f),"number"==typeof f.expires){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h}try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(i){}return e=encodeURIComponent(String(e)),e=e.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(String(b)),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape),document.cookie=[b,"=",e,f.expires&&"; expires="+f.expires.toUTCString(),f.path&&"; path="+f.path,f.domain&&"; domain="+f.domain,f.secure?"; secure":""].join("")}b||(g={});for(var j=document.cookie?document.cookie.split("; "):[],k=/(%[0-9A-Z]{2})+/g,l=0;l<j.length;l++){var m=j[l].split("="),n=m[0].replace(k,decodeURIComponent),o=m.slice(1).join("=");'"'===o.charAt(0)&&(o=o.slice(1,-1));try{if(o=c&&c(o,n)||o.replace(k,decodeURIComponent),this.json)try{o=JSON.parse(o)}catch(i){}if(b===n){g=o;break}b||(g[n]=o)}catch(i){}}return g}return d.get=d.set=d,d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b()});
/*eslint-enable */
