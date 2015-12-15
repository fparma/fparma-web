
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

  var imagesFinished = false
  !(function () {
    var root = $('#media-screenshots')
    if (!root.length) return

    root.find('.row').addClass('invis').hide()
    var loader = $('#loader').parent().removeClass('invis').hide()

    var prepareAndLoadImage = function (imgEl) {
      var dfd = $.Deferred()
      imgEl.data('caption', imgEl.attr('data-caption'))
      imgEl.attr('author', imgEl.attr('data-author'))

      imgEl.load(function () {
        if (dfd.state() === 'pending') dfd.resolve(imgEl.addClass('loaded'))
      })

      imgEl.on('error', function () {
        if (dfd.state() === 'pending') dfd.resolve(null)
      })

      window.setTimeout(function () {
        if (dfd.state() === 'pending') dfd.resolve(imgEl)
      }, 5000)

      imgEl.attr('src', imgEl.attr('href'))
      if (imgEl.get(0).complete === true) dfd.resolve(imgEl)
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

            if (!img) {
              img.parentsUntil('.row').remove()
              img.remove()
            }
            if (loaded >= rowImages.length) {
              dfd.resolve($row)
            }

          })
        })
        if (i >= (amountRows - 1)) return false
      })

      return $.when.apply($, dfds)
    }

    var loadMore = function (amountRows, isFirstLoad) {
      var dfd = $.Deferred()
      loader.fadeToggle()

      prepareRows(amountRows).then(function () {
        var args = [].slice.call(arguments)
        if (!args.length) {
          loader.fadeToggle()
          return dfd.resolve(0)
        }
        var remainingRows = root.find('.row.invis').length

        loader.fadeToggle({
          complete: function () {
            var i = 0
            var enough = (isMobile() || !isFirstLoad) ? 1 : 3

            var next = function () {
              if (i++ >= enough) {
                args.forEach(function (v) {$(v).show()})
                return dfd.resolve(remainingRows)
              }
args.shift().show({complete: next})
            }
/*
              $(args.shift()).transition('slide down', {
                duration: 150 + (Math.random() * 200),
                onComplete: next
              }).length ? '' : dfd.resolve(remainingRows)
*/
            next()
          }
        })
      })
      return dfd.promise()
    }
/*
    $(window).on('resize', function () {

      root.find('.row:not(.invis)').each(function () {
        var img = $(this).find('img')
        var max = 0
        img.each(function () {max = Math.max(max, $(this).height())})
        img.css({height: max})
      })
    })
*/
    var LOAD_MORE_AMOUNT = isMobile() ? 2 : 6
    loadMore(LOAD_MORE_AMOUNT, true).then(function () {

      root.waypoint(function (direction) {
        if (direction === 'down') {
          var self = this
          self.disable()

          loadMore(LOAD_MORE_AMOUNT, false).then(function (remainingRows) {
            if (!remainingRows) return
            window.Waypoint.refreshAll()
            self.enable()
          })
        }
      }, {
        offset: 'bottom-in-view'
      })

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

          $container.find('.caption').html(document.createTextNode(caption ? '"' + caption + '"' : ''))
          $container.find('.author').html(document.createTextNode(author ? 'Submitted by ' + author : ''))
          if (caption || author) $container.fadeIn('fast')
        }
      })
    })

  /*
    if (!$('#media-screenshots').length) return
    var loader = $('#loader').removeClass('invis')

    var replaceAndLoad = function (inputEl) {
      var dfd = $.Deferred()
      var url = inputEl.attr('data-url')
      var first = inputEl.attr('data-first')
      var caption = inputEl.attr('data-caption')
      var author = inputEl.attr('data-author')

      var image = $('<img>', {
        src: url,
        href: url, // needed for gallery
        'class': 'ui rounded centered image'
      })

      image.load(function () {
        if (first === 'true') image.addClass('first-row')
        if (!isMobile()) image.addClass('zoom-effect')
        image.data('caption', caption)
        image.data('author', author)
        if (dfd.state() === 'pending') dfd.resolve(image)
      })

      image.on('error', function () {
        image.parentsUntil('.row').remove()
        image.remove()
        dfd.resolve(null)
      })

      window.setTimeout(function () {
        if (dfd.state() === 'pending') dfd.resolve(image)
      }, 5000)

      inputEl.replaceWith(image)
      return dfd.promise()
    }

    var root = $('#media-screenshots')
    var rows = $('.js-images .row').hide()

    var images = root.find('.js-images').hide().find('.js-img')
    var imagesNeeded = images.length > 8 ? 8 : Math.min(2, images.length)

    $(window).on('resize', function () {
      root.find('img').toggleClass('zoom-effect', !isMobile())
    })

    root.featherlightGallery({
      beforeOpen: function (e) {
        if (isMobile() && e.target) {
          e.stopPropagation()
          window.open(e.target.src)
          return false
        }
      },
      afterContent: function () {
        var $this = this.$currentTarget
        var $container = this.$instance.find('.text-container')
        var caption = $this.data('caption')
        var author = $this.data('author')

        $container.find('.caption').html(document.createTextNode(caption ? '"' + caption + '"' : ''))
        $container.find('.author').html(document.createTextNode(author ? 'Submitted by ' + author : ''))
        if (!caption && !author) $container.fadeOut('fast')
        else $container.fadeIn('fast')
      }
    })

    var loaded = 0
    var done = false
    images.each(function (i) {
      replaceAndLoad($(this)).then(function (img) {

        if (i < imagesNeeded) loaded++
        if (loaded < imagesNeeded && !done) return

        if (done) return
        done = true

        loader.fadeOut({
          complete: fadeInRows
        })

        function fadeInRows () {
          root.find('.js-images').show()
          imagesFinished = true
          if (isMobile()) {
            rows.slice(0, 2).transition('slide down')
            rows.slice(2).show()
            return
          }

          var rowIdx = 0
          var amountRows = imagesNeeded > 3 ? 3 : imagesNeeded
          var next = function () {
            if (rowIdx >= amountRows) return rows.fadeIn()
            $(rows.get(rowIdx)).transition('slide down', {
              duration: 200 + (Math.random() * 200),
              onComplete: next
            })
            rowIdx++
          }
          return next()
        }
      })
    })
  */
  })()

  !(function () {
    var rootVideos = $('#media-videos')
    if (!rootVideos.length) return
    var rootScreenshots = $('#media-screenshots')
    var loader = $('#loader')

    rootVideos.hide().removeClass('invis')

    var showingScreenshots = true
    var videosLoaded = false
    var videosLoading = false

    $('#js-load-more-videos').on('click', function () {
      if (videosLoading) return
      var $this = $(this).addClass('disabled loading')
      window.setTimeout(function () {
        if (!loadVideos()) return $this.removeClass('loading')
        $this.removeClass('disabled loading')
      }, 1500)
    })

    var convertInput = function (el) {
      return el.parent().html(el.text()).find('.ui.embed').embed({autoplay: true})
    }

    var LOAD_MORE_AMOUNT = 8
    var loadVideos = function () {
      var amount = rootVideos.find('.js-video').slice(0, LOAD_MORE_AMOUNT)
      if (!amount.length) return
      videosLoading = true

      amount.removeClass('.js-video')
      .each(function () {
        convertInput($(this))

        loader.fadeOut({
          complete: function () {
            rootVideos.fadeIn()
            videosLoading = false
            videosLoaded = true
          }
        })
      })

      rootVideos.find(':not(.js-video)')
      .parentsUntil('.column')
      .removeClass('invis')
      return rootVideos.find('.js-video').length > 0
    }

    $('.js-media-menu-btn').on('click', function () {
      var $this = $(this)
      if (!imagesFinished || videosLoading || $this.hasClass('active')) return

      $this.addClass('active')
      .siblings()
      .removeClass('active')

      if (videosLoaded) {
        if (showingScreenshots) {
          rootScreenshots.fadeOut({complete: function () {rootVideos.fadeIn('fast')}})
        }else {
          rootVideos.fadeOut({complete: function () {rootScreenshots.fadeIn('fast')}})
        }
      } else {
        rootScreenshots.fadeOut({
          complete: function () {
            loader.fadeIn()
            loadVideos()
          }
        })
      }
      showingScreenshots = !showingScreenshots
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
