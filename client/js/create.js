(function ($) {
  var formCreate = $('#create')
  formCreate.find('.js-tab').tab()

  formCreate.form({
    fields: {
      author: {
        identifier: 'author',
        optional: true,
        rules: [{
          type: 'maxLength[24]',
          prompt: 'Authors cannot contain more than 24 characters'
        }]
      },
      name: {
        identifier: 'name',
        rules: [{
          type: 'empty',
          prompt: 'Event name cannot be empty'
        }, {
          type: 'maxLength[48]',
          prompt: 'Event name cannot contain more than 48 characters'
        }, {
          type: 'minLength[4]',
          prompt: 'Event name must contain more than 3 characters'
        }]
      },
      description: {
        identifier: 'description',
        rules: [{
          type: 'empty',
          prompt: 'Description cannot be empty'
        }, {
          type: 'maxLength[4096]',
          prompt: 'Description cannot contain more than 4096 characters'
        }, {
          type: 'minLength[25]',
          prompt: 'Description must contain more than 24 characters'
        }]
      }
    },
    onSuccess: function (e) {
      e.preventDefault()
      submitEvent()
    },
    selector: {
      message: '#js-create-errors'
    }
  })

  var SLOTS_INP = {
    MIN: 2,
    MAX: 24
  }
  var UNITS_IN_NEW_GRP = 8
  var MAX_UNITS_IN_GRP = 20
  var GRP_TEMPLATE = $($('#js-grp-template').html())
  var UNIT_TEMPLATE = $($('#js-unit-template').html())
  var SLOT_SIDES = ['blufor', 'opfor', 'greenfor', 'civilian']

  var btnManual = $('#js-slots-btn-manual')
  var btnSqm = $('#js-slots-btn-sqm')
  var btnSubmit = $('#submit-btn')
  var slotsContainer = $('#slots')
  slotsContainer.hide().removeClass('invis')

  function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function getSideContainer (side) {
    return $('#js-side-container-' + side)
  }

  // Mark slots inputs in red if invalid
  $('#slots').on('blur, keyup', '.js-unit, .js-grp', function () {
    var $this = $(this)
    var val = $this.val()
    if (val.length < SLOTS_INP.MIN || val.length > SLOTS_INP.MAX) {
      $this.addClass('error')
    }else {
      $this.removeClass('error')
    }
  })

  btnManual.click(function () {
    btnManual.addClass('disabled')
    btnSqm.addClass('disabled')
    slotsContainer.fadeIn()
  })

  $('#js-slots-btn-reset').click(function () {
    $.each(SLOT_SIDES, function (i, side) {
      removeSide(side)
    })
    slotsContainer.fadeOut()
    btnSqm.removeClass('disabled')
    btnManual.removeClass('disabled')
  })

  // The selectable 'sides' buttons
  $('.js-btn-side').click(function () {
    var side = $(this).data('side')
    toggleShowSide(side)
    createNewGroup(side)
  })

  // 'New group' button for each side
  $('.js-btn-newgrp').click(function () {
    var side = $(this).data('side')
    createNewGroup(side)
  })

  function removeSide (side) {
    var sideContainer = getSideContainer(side)
    $('.js-btn-side[data-side= ' + side + ']').removeClass('toggle active')
    sideContainer.children('.js-group-container').empty()
    return sideContainer.addClass('invis')
  }

  // Toggles a side after clicking the side buttons
  // or when no groups in side
  function toggleShowSide (side) {
    var sideContainer = getSideContainer(side)

    if (sideContainer.hasClass('invis')) sideContainer.removeClass('invis')
    else {
      sideContainer.children('.js-group-container').empty()
      sideContainer.addClass('invis')
    }
    $('.js-btn-side[data-side=' + side + ']').toggleClass('toggle active')
  }

  // Creates a new group and appends to container
  function createNewGroup (side, amountUnits) {
    var sideContainer = getSideContainer(side)
    var grpContainer = GRP_TEMPLATE.clone()
    var unitRoot = grpContainer.children('.segment')
    var l = amountUnits || UNITS_IN_NEW_GRP
    var i = 0

    for (; i < l; i++) {
      unitRoot.append(UNIT_TEMPLATE.clone())
    }

    var title = capitalize(side) + ' group'
    unitRoot.find('h4').first().html(title)
    addGroupClickHandlers(grpContainer, side)

    grpContainer.appendTo(sideContainer.find('.js-group-container'))
    .hide()
    .transition('scale')

    updateUnitsInGroup(grpContainer, l)
    return grpContainer
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
        if (!getSideContainer(side).find('.js-grp-root').length) {
          removeSide(side)
        }
      }
    })
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

  var dateInput = (function () {
    var formatDateStr = 'YYYY-MMM-DD, HH:mm'
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
      var d = getUTCDate()
      if (!d) return
      $('#js-time')
        .html('Entered time in UTC: <b>' +
          d.format(formatDateStr) + '</b>')
    }

    function getUTCDate () {
      var d = pickDate.pickadate('get', 'select')
      var t = pickTime.pickatime('get', 'select')
      if (!d || !t) return null
      d.obj.setHours(t.hour)
      d.obj.setMinutes(t.mins)
      return window.moment(d.obj).utc()
    }

    return {
      getUTCDate: getUTCDate,
      getDisplayDate: function () {
        var d = getUTCDate()
        if (!d) return null
        return d.format(formatDateStr)
      }
    }
  })()

  function getEventData () {
    var evt = {
      name: $('.js-event-name').val(),
      type: $('.js-event-type input:checked').val().toLowerCase(),
      authors: $('.js-event-authors').val(),
      description: $('#js-description').val()
    }

    var d = dateInput.getUTCDate()
    if (d) evt.date = d.toISOString()

    var grps = evt.groups = []
    $(SLOT_SIDES).each(function (i, side) {
      getSideContainer(side)
      .find('.js-grp-root').each(function () {
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

    return evt
  }

  formCreate.find('#js-review-btn').on('click', function updateReview () {
    var missingMsg = 'Not specified'
    function getUnitsAmount (side) {
      return grps
      .filter(function (v) { return v.side === side })
      .map(function (v) { return v.units.length })
      .reduce(function (a, b) { return a + b }, 0)
    }

    var data = getEventData()
    $('#js-review-list .js-name').html(data.name || missingMsg)
    $('#js-review-list .js-type').html(data.type.toUpperCase())
    $('#js-review-list .js-authors').html(data.authors || missingMsg + ' (default System)')
    $('#js-review-list .js-date').html(dateInput.getDisplayDate() || missingMsg)

    var grps = data.groups || []
    $('#js-review-list .js-groups').html(grps.length)
    if (!grps.length) return $('#js-review-list .js-total').html(0)

    var str = ''
    SLOT_SIDES.forEach(function (v) {
      var amount = getUnitsAmount(v)
      if (amount) str += capitalize(v) + ': ' + amount + ', '
    })
    $('#js-review-list .js-total').html(str.substr(0, str.lastIndexOf(',')))
  })

  function submitEvent () {
    var evt = getEventData()

    btnSubmit.addClass('disabled loading')
    $.ajax({
      url: '/events/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(evt)
    })
    .success(function (response) {
      if (!response.ok) {
        var cntr = $('#js-create-errors').html('').append('<ul class="list">')
        if ($.isArray(response.error)) {
          $.each(response.error, function (i, err) {
            cntr.append($('<li>' + err + '</li>'))
          })
        } else {
          cntr.append($('<li>' + response.error + '</li>'))
        }
        cntr.append('</ul>').fadeIn()
        btnSubmit.removeClass('loading disabled')
      }else {
        window.location.replace(window.location.origin + '/events/event/' + response.data)
      }
    })
  }

  var sqmErrorContainer = $('#js-sqm-error')
  var printSqmError = function (msg) {
    if (!msg) return
    sqmErrorContainer.find('p').html(msg)
    sqmErrorContainer.fadeIn()
  }

  /* Handle Upload SQM*/
  var xhr2 = !!(window.FormData && ('upload' in ($.ajaxSettings.xhr())))
  if (!xhr2) {
    $('#js-slots-btn-sqm').addClass('disabled')
    printSqmError('Your browser does not support file upload')
  } else {
    var fileForm = $('#js-form-upload-file')
    var sqmFileInput = $('#js-input-file-sqm')
    var sqmUploadBtn = $('#js-slots-btn-sqm')

    // Resets the input
    var resetFileInput = function () {
      sqmFileInput.wrap('<form>').closest('form').get(0).reset()
      sqmFileInput.unwrap()
    }

    sqmUploadBtn.click(function (e) {
      e.preventDefault()
      sqmErrorContainer.fadeOut()
      sqmFileInput.click()
    })

    sqmFileInput.change(function () {
      var file = this.files[0]
      if (!file || !file.size) return
      if (file.size > (1024 * 1024 * 3)) {
        resetFileInput()
        return printSqmError('File exceeds limit (3mb)')
      }
      sqmUploadBtn.addClass('loading disabled')
      fileForm.submit()
    })

    var handleParsedSqmGroups = function (reply) {
      btnSqm.removeClass('disabled')
      if (!reply.ok) return printSqmError(reply.error)
      if (!reply.data.length) return printSqmError('No groups found')
      btnManual.addClass('disabled')
      btnSqm.addClass('disabled')

      var sides = []
      $.each(reply.data, function (i, grp) {
        if (!~sides.indexOf(grp.side)) sides.push(grp.side)
        var grpCntr = createNewGroup(grp.side, grp.units.length)
        var grpInp = grpCntr.find('.js-grp')
        grpInp.val(grp.name)
        if (grp.name.length < SLOTS_INP.MIN || grp.name.length > SLOTS_INP.MAX) {
          grpInp.addClass('error')
        }

        var units = grpCntr.find('.js-unit')
        $.each(grp.units, function (i, unit) {
          var inp = $(units.get(0))
          inp.val(unit.description)
          if (unit.description.length < SLOTS_INP.MIN ||
              unit.description.length > SLOTS_INP.MAX) {
            inp.addClass('error')
          }
          units.splice(0, 1)
        })
      })

      $.each(sides, function (i, side) {
        toggleShowSide(side)
      })
      slotsContainer.fadeIn()
    }

    // Submits SQM file
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
      })
      .success(handleParsedSqmGroups)
      .always(function () {
        resetFileInput()
        sqmUploadBtn.removeClass('loading')
      })
      return false
    })
  }
})(window.jQuery)
