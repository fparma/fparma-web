(function ($) {

  var UNITS_IN_NEW_GRP = 8
  var MAX_UNITS_IN_GRP = 20
  var GRP_TEMPLATE = $($('#js-grp-template').html())
  var UNIT_TEMPLATE = $($('#js-unit-template').html())

  function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function getSideContainer (side) {
    return $('#js-side-container-' + side)
  }

  $('#js-slots-btn-manual').click(function () {
    $(this).addClass('disabled')
    $('#js-slots-btn-sqm').addClass('disabled')
    $('#slots').removeClass('invis')
  })

  $('#js-slots-btn-reset').click(function () {
    $.each(['blufor', 'opfor', 'greenfor', 'civilian'], function (i, side) {
      removeSide(side)
    })
    $('#slots').addClass('invis')
    $('#js-slots-btn-sqm').removeClass('disabled')
    $('#js-slots-btn-manual').removeClass('disabled')

  })

  // The selectable 'sides' buttons
  $('.js-btn-side').click(function () {
    toggleShowSide($(this).data('side'))
  })

  function removeSide (side) {
    var sideContainer = getSideContainer(side)
    $('.js-btn-side[data-side= ' + side + ']').removeClass('toggle active')
    sideContainer.children('.js-group-container').empty()
    return sideContainer.addClass('invis')
  }

  // Toggles a side after clicking the side buttons
  // or when no groups in side
  function toggleShowSide (side, forceClose) {
    var sideContainer = getSideContainer(side)
    if (forceClose) {
      $('.js-btn-side[data-side= ' + side + ']').removeClass('toggle active')
      sideContainer.children('.js-group-container').empty()
      return sideContainer.addClass('invis')
    }

    if (sideContainer.hasClass('invis')) {
      createNewGroup(side)
      sideContainer.removeClass('invis')
    } else {
      sideContainer.children('.js-group-container').empty()
      sideContainer.addClass('invis')
    }
    $('.js-btn-side[data-side=' + side + ']').toggleClass('toggle active')
    if ($('.js-btn-side.active').length > 0) {
      $('#submit-btn').removeClass('disabled')
    } else {
      $('#submit-btn').addClass('disabled')
    }
  }

  // 'New group' button
  $('.js-btn-newgrp').click(function () {
    var side = $(this).data('side')
    createNewGroup(side)
  })

  // Creates a new group and appends to container
  function createNewGroup (side) {
    var sideContainer = getSideContainer(side)
    var grpContainer = GRP_TEMPLATE.clone()
    var unitRoot = grpContainer.children('.segment')
    var i = 0

    for (; i < UNITS_IN_NEW_GRP; i++) {
      unitRoot.append(UNIT_TEMPLATE.clone())
    }

    var title = capitalize(side) + ' group '
    unitRoot.find('h4').first().html(title)
    addGroupClickHandlers(grpContainer, side)

    grpContainer
    .appendTo(sideContainer.find('.js-group-container'))
    .hide()
    .transition('scale')

    updateUnitsInGroup(grpContainer, UNITS_IN_NEW_GRP)
  }

  // removes a group with fade out
  function removeGroup (groupEl, side) {
    var rootEl = groupEl.closest('.js-grp-root')
    rootEl.find('.button').addClass('disabled')
    rootEl.transition({
      animation: 'scale',
      allowRepeats: false,
      onComplete: function () {
        rootEl.remove()
        checkRemainingGroups(side)
      }
    })
  }

  // side gets hidden if no remaining groups
  function checkRemainingGroups (side) {
    var cnt = getSideContainer(side).find('.js-grp-root').length
    if (!cnt) removeSide(side)
  }

  function updateUnitsInGroup (groupEl, amount) {
    groupEl.find('.js-unit-amount')
      .html('(' + amount + '/' + MAX_UNITS_IN_GRP + ')')
  }

  // Handlers for rem grp, add or remove unit
  function addGroupClickHandlers (groupEl, side) {
    groupEl.find('.js-btn-rmgrp').click(function () {
      removeGroup(groupEl, side)
    })

    groupEl.find('.js-btn-addunit').click(function () {
      UNIT_TEMPLATE.clone()
      .appendTo(groupEl.find('.js-unit').parent())
      .hide()
      .transition('fade down')

      var units = groupEl.find('.js-unit').length
      updateUnitsInGroup(groupEl, units)
      if (units >= MAX_UNITS_IN_GRP) {
        $(this).addClass('disabled')
      }
    })

    groupEl.find('.js-btn-rmunit').click(function (e) {
      var unit = groupEl.find('.js-unit').last()
      if (!unit.length) return

      unit.transition('fade up', {
        duration: 100,
        onComplete: function () {
          unit.remove()
          var remaining = groupEl.find('.js-unit').length
          updateUnitsInGroup(groupEl, remaining)
          if (!remaining) return removeGroup(groupEl, side)
          if (remaining < MAX_UNITS_IN_GRP) {
            groupEl.find('.js-btn-addunit').removeClass('disabled')
          }
        }
      })
    })
  }

  function postEvent () {
    var evt = {
      name: $('.js-event-name').val(),
      type: $('.js-event-type input :checked').val().toUpperCase(),
      authors: $('.js-event-authors').val()
    }
    // TODO: date

    var grps = evt.groups = []
    $('div[id^="js-side-container-"]').each(function () {
      var $cntr = $(this)
      var side = $cntr.find('.js-btn-newgrp').attr('data-side')

      $cntr.find('.js-grp-root').each(function () {
        var name = $(this).find('input.js-grp').val()
        var units = []

        $(this).find('input.js-unit').each(function () {
          units.push({
            description: $(this).val()
          })
        })

        grps.push({
          name: name,
          side: side,
          units: units
        })
      })
    })
  }

  $(function () {
    var pickDate = $('#create-date').pickadate({
      format: 'ddd dd mmm, yyyy',
      selectYears: false,
      firstDay: true,
      min: window.moment().add(1, 'hour').toDate(),
      max: window.moment().add(2, 'months').toDate()
    })

    var pickTime = $('#create-time').pickatime({
      format: 'HH:i',
      formatLabel: 'HH:i'
    })

    pickDate.change(updateTime)
    pickTime.change(updateTime)

    function updateTime () {
      var d = pickDate.pickadate('get', 'select')
      var t = pickTime.pickatime('get', 'select')
      if (!d || !t) return
      d.obj.setHours(t.hour)
      d.obj.setMinutes(t.mins)
      $('.js-time')
        .html('Entered time in UTC: <b>' +
          window.moment(d.obj).utc().format('YYYY-MM-DD, HH:mm') + '</b>')
    }
  })

  /* Handle Upload SQM*/
  var xhr2 = !!(window.FormData && ('upload' in ($.ajaxSettings.xhr())))
  if (!xhr2) {
    $('#js-slots-sqm').addClass('disabled')
  } else {

    var fileForm = $('#js-form-upload-file')
    var sqmFileInput = $('#js-input-file-sqm')
    var sqmUploadBtn = $('#js-slots-btn-sqm')
    var errorContainer = $('#js-sqm-error')

    var resetFileInput = function () {
      // Resets the input
      sqmFileInput.wrap('<form>').closest('form').get(0).reset()
      sqmFileInput.unwrap()
    }

    var printSqmError = function (msg) {
      if (!msg) return
      errorContainer.find('p').html(msg)
      errorContainer.removeClass('hidden')
    }

    sqmUploadBtn.click(function (e) {
      e.preventDefault()
      errorContainer.addClass('hidden')
      sqmFileInput.click()
    })

    sqmFileInput.change(function () {
      var file = this.files[0]
      if (!file || !file.size) return
      console.log(file.size)
      if (file.size > 3000000) {
        resetFileInput()
        return printSqmError('File exceeds limit (3mb)')
      }
      sqmUploadBtn.addClass('loading disabled')
      fileForm.submit()
    })

    fileForm.submit(function (e) {
      e.preventDefault()
      var formData = new window.FormData($(this)[0])

      $.ajax({
        url: '/events/create/upload-sqm',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
      }).success(function (reply) {
        if (!reply.ok) return printSqmError(reply.error)
        console.log(reply.data)
      }).always(function () {
        resetFileInput()
        sqmUploadBtn.removeClass('disabled loading')
      })
      return false
    })
  }
})(window.jQuery)
