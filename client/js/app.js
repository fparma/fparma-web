/* global $ */

$(function () {

  window.addEventListener('load', function () {
    window.FastClick(document.body)
  }, false)

  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade')
  })

  if (!$('form#create').length) return

  var SIDES = ['blufor', 'opfor', 'greenfor', 'civilian']
  var GRP_TEMPLATE = $('#js-grp-template').html()
  var UNIT_TEMPLATE = $('#js-unit-template').html()

  function getSideContainer (side) {
    return $('#js-side-container-' + side)
  }

  // The selectable 'sides' buttons
  $('.js-btn-side').click(function () {
    toggleShowSide($(this).data('side'))
  })

  // Toggles a side after clicking the side buttons
  // or when no groups in side
  function toggleShowSide (side, force) {
    var sideContainer = getSideContainer(side)
    if (force !== true && sideContainer.hasClass('hidden')) {
      createNewGroup(side)
      sideContainer.removeClass('hidden')
    } else {
      sideContainer.children('.js-group-container').empty()
      sideContainer.addClass('hidden')
    }
    $('.js-btn-side[data-side=' + side + ']').toggleClass('toggle active')
  }

  // 'New group' button
  $('.js-btn-newgrp').click(function () {
    var side = $(this).data('side')
    createNewGroup(side)
  })

  // Creates a new group and appends to container
  function createNewGroup (side) {
    var title = side.charAt(0).toUpperCase() + side.slice(1) + ' group'
    var grp = $(GRP_TEMPLATE)
    var unit = $(UNIT_TEMPLATE)
    var unitRoot = grp.children('.segment')
    var i = 0

    for (; i < 8; i++) {
      unitRoot.append(unit.clone())
    }

    unitRoot.find('h4').first().html(title)
    initGroupEvents(grp, side)

    getSideContainer(side)
    .find('.js-group-container')
    .append(grp)
  }

  function initGroupEvents (group, side) {
    group.find('.js-btn-rmgrp').click(function () {
      group.closest('.js-grp-root').parent().remove()
      checkRemainingGroups()
    })
  }

  function checkRemainingGroups (side) {
    var cnt = getSideContainer(side).find('.js-grp-root').length
    console.log(cnt);
    if (!cnt) {
      toggleShowSide(side, true)
    }
  }


  $('#create-date').pickadate({
    format: 'ddd dd mmm, yyyy',
    selectYears: false,
    firstDay: true,
    min: window.moment().add(1, 'hour').toDate(),
    max: window.moment().add(2, 'months').toDate()
  })
  $('#create-time').pickatime({
    format: 'HH:i',
    formatLabel: 'HH:i'
  })

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
      $('#js-input-file-sqm').click()
    })

    sqmFileInput.change(function () {
      var file = this.files[0]
      if (!file) return
      if (file.size / (1024 * 2) > 3) {
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
})
