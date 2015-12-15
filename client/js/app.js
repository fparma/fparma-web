
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

      var done = function () {
        if (imgEl.get(0).complete === true) {
          imgEl.addClass('loaded')
        }
        if (dfd.state() === 'pending') dfd.resolve(imgEl)
      }

      imgEl.load(done)
      window.setTimeout(done, 5000)

      imgEl.on('error', function () {
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

    var matchHeight = function (row) {
      row.find('img').matchHeight({
        property: 'height'
      })
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
        loader.fadeToggle({
          complete: function () {
            var i = 0
            var enough = (isMobile() || !isFirstLoad) ? 1 : 3
            var prev

            var next = function () {
              if (prev) matchHeight(prev)

              if (i++ >= enough) {
                $.each(args, function () {
                  var $this = $(this)
                  $this.show({
                    complete: function () {
                      matchHeight($this)
                    }
                  })
                })
                return dfd.resolve(remainingRows)
              }

              prev = $(args.shift())
              if (!prev.length) return dfd.resolve(remainingRows)

              prev.transition('slide down', {
                duration: 150 + (Math.random() * 200),
                onComplete: next
              })
            }
            next()
          }
        })
      })
      return dfd.promise()
    }

    var LOAD_MORE_AMOUNT = isMobile() ? 2 : 6
    loadMoreRows(LOAD_MORE_AMOUNT, true).then(function () {

      root.waypoint(function (direction) {
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

/**

* jquery.matchHeight.js master
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = 'master';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = Infinity;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) < targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert display block
                    $that.css('display', '');
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // update heights on load and resize events
    $(window).bind('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window).bind('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});
/*eslint-enable */
