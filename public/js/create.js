!function(e){function t(e){return e.charAt(0).toUpperCase()+e.slice(1)}function n(t){return e("#js-side-container-"+t)}function i(t){var i=n(t);return e(".js-btn-side[data-side= "+t+"]").removeClass("toggle active"),i.children(".js-group-container").empty(),i.addClass("invis")}function a(t){var i=n(t);i.hasClass("invis")?i.removeClass("invis"):(i.children(".js-group-container").empty(),i.addClass("invis")),e(".js-btn-side[data-side="+t+"]").toggleClass("toggle active")}function s(e,i,a){for(var s=n(e),r=v.clone(),d=r.children(".segment"),c=i||m,u=0;u<c;u++)d.append(h.clone());var p=t(e)+" group";return d.prev("h4").html(p),l(r,e),r.appendTo(s.find(".js-group-container")),a||r.hide().transition("scale"),o(r,c),r}function r(e,t){var a=e.closest(".js-grp-root");a.find(".button").addClass("disabled"),a.transition({animation:"scale",allowRepeats:!1,onComplete:function(){a.remove(),n(t).find(".js-grp-root").length||i(t)}})}function o(e,t){e.find(".js-unit-amount").html("("+t+"/"+f+")")}function l(t,n){t.find(".js-btn-description").popup({popup:t.find(".popup"),transition:"fade up",exclusive:!0,position:"bottom left",on:"click"}),t.find(".js-btn-rmgrp").click(function(){r(t,n)}),t.find(".js-btn-addunit").click(function(){h.clone().appendTo(t.find(".js-unit").parent()).hide().transition("fade down");var n=t.find(".js-unit").length;o(t,n),n>=f&&e(this).addClass("disabled")}),t.find(".js-btn-rmunit").click(function(e){var i=t.find(".js-unit").last();i.length&&i.transition("fade up",{duration:100,onComplete:function(){i.remove();var e=t.find(".js-unit").length;return o(t,e),e?void(e<f&&t.find(".js-btn-addunit").removeClass("disabled")):r(t,n)}})})}function d(){var t={name:e(".js-event-name").val(),type:e(".js-event-type input:checked").val().toLowerCase(),authors:e(".js-event-authors").val(),description:e("#js-description").val(),image_url:e(".js-event-image").val()},i=y.getUTCDate();i&&(t.date=i.toISOString());var a=t.groups=[];return e(g).each(function(t,i){n(i).find(".js-grp-root").each(function(){var t=e(this).find("input.js-grp").val(),n=e(this).find("textarea").val(),s=[];e(this).find("input.js-unit").each(function(){s.push({description:e(this).val()})}),a.push({name:t,side:i,description:n,units:s})})}),t}function c(){var t=d();C.addClass("disabled loading"),e.ajax({url:"/events/create",type:"POST",contentType:"application/json",data:JSON.stringify(t)}).success(function(t){if(t.ok)window.location.replace(window.location.origin+"/events/event/"+t.data);else{var n=e("#js-create-errors").html("").append('<ul class="list">');e.isArray(t.error)?e.each(t.error,function(t,i){n.append(e("<li>"+i+"</li>"))}):n.append(e("<li>"+t.error+"</li>")),n.append("</ul>").fadeIn(),C.removeClass("loading disabled")}})}var u=e("#create");u.find(".js-tab").tab(),u.form({fields:{author:{identifier:"author",optional:!0,rules:[{type:"maxLength[24]",prompt:"Authors cannot contain more than 24 characters"}]},name:{identifier:"name",rules:[{type:"empty",prompt:"Event name cannot be empty"},{type:"maxLength[48]",prompt:"Event name cannot contain more than 48 characters"},{type:"minLength[4]",prompt:"Event name must contain more than 3 characters"}]},description:{identifier:"description",rules:[{type:"empty",prompt:"Description cannot be empty"},{type:"maxLength[4096]",prompt:"Description cannot contain more than 4096 characters"},{type:"minLength[25]",prompt:"Description must contain more than 24 characters"}]}},onSuccess:function(e){e.preventDefault(),c()},selector:{message:"#js-create-errors"}});var p={MIN:2,MAX:24},m=8,f=20,v=e(e("#js-grp-template").html()),h=e(e("#js-unit-template").html()),g=["blufor","opfor","greenfor","civilian"],j=e("#js-slots-btn-manual"),b=e("#js-slots-btn-sqm"),C=e("#submit-btn"),w=e("#slots");w.hide().removeClass("invis"),e("#slots").on("change",".js-unit, .js-grp",function(){var t=e(this),n=t.val().trim();!n||n.length<p.MIN||n.length>p.MAX?t.addClass("error"):t.removeClass("error")}),j.click(function(){j.addClass("disabled"),b.addClass("disabled"),w.fadeIn()}),e("#js-slots-btn-reset").click(function(){e.each(g,function(e,t){i(t)}),w.fadeOut(),b.removeClass("disabled"),j.removeClass("disabled")}),e(".js-btn-side").click(function(){var t=e(this).data("side");a(t),s(t)}),e(".js-btn-newgrp").click(function(){var t=e(this).data("side");s(t)});var y=function(){function t(){var t=n();t&&e("#js-time").html("Entered time in UTC: <b>"+t.format(i)+"</b>")}function n(){var e=a.pickadate("get","select"),t=s.pickatime("get","select");return e&&t?(e.obj.setHours(t.hour),e.obj.setMinutes(t.mins),window.moment(e.obj).utc()):null}var i="YYYY-MMM-DD, HH:mm",a=e("#create-date").pickadate({format:"ddd dd mmm, yyyy",selectYears:!1,firstDay:!0,min:window.moment().add(1,"hour").toDate(),max:window.moment().add(2,"months").toDate()}),s=e("#create-time").pickatime({format:"HH:i",formatLabel:"HH:i"});return a.change(t),s.change(t),{getUTCDate:n,getDisplayDate:function(){var e=n();return e?e.format(i):null}}}();u.find("#js-review-btn").on("click",function(){function n(e){return s.filter(function(t){return t.side===e}).map(function(e){return e.units.length}).reduce(function(e,t){return e+t},0)}var i="Not specified",a=d();e("#js-review-list .js-name").html(a.name||i),e("#js-review-list .js-type").html(a.type.toUpperCase()),e("#js-review-list .js-authors").html(a.authors||i+" (default System)"),e("#js-review-list .js-date").html(y.getDisplayDate()||i),e("#js-image").attr("src",a.image_url||"").addClass(a.image_url?"":"invis").removeClass(a.image_url?"invis":"");var s=a.groups||[];if(e("#js-review-list .js-groups").html(s.length),!s.length)return e("#js-review-list .js-total").html(0);var r="";g.forEach(function(e){var i=n(e);i&&(r+=t(e)+": "+i+", ")}),e("#js-review-list .js-total").html(r.substr(0,r.lastIndexOf(",")))});var D=e("#js-sqm-error"),k=function(e){e&&(D.find("p").html(e),D.fadeIn())},x=!!(window.FormData&&"upload"in e.ajaxSettings.xhr());if(x){var M=e("#js-form-upload-file"),I=e("#js-input-file-sqm"),T=e("#js-slots-btn-sqm"),O=function(){I.wrap("<form>").closest("form").get(0).reset(),I.unwrap()};T.click(function(e){e.preventDefault(),D.fadeOut(),I.click()}),I.change(function(){var e=this.files[0];if(e&&e.size){if(e.size>3145728)return O(),k("File exceeds limit (3mb)");T.addClass("loading disabled"),M.submit()}});var S=function(t){if(b.removeClass("disabled"),!t.ok)return k(t.error);if(!t.data.length)return k("No groups found");j.addClass("disabled"),b.addClass("disabled");var n=[];e.each(t.data,function(t,i){~n.indexOf(i.side)||n.push(i.side);var a=s(i.side,i.units.length,!0),r=a.find(".js-grp");r.val(i.name),(i.name.length<p.MIN||i.name.length>p.MAX)&&r.addClass("error");var o=a.find(".js-unit");e.each(i.units,function(t,n){var i=e(o.get(0));i.val(n.description),(n.description.length<p.MIN||n.description.length>p.MAX)&&i.addClass("error"),o.splice(0,1)})}),e.each(n,function(e,t){a(t)}),w.fadeIn()};M.submit(function(t){t.preventDefault();var n=new window.FormData(e(this)[0]);return e.ajax({url:"/events/create/upload-sqm",type:"POST",data:n,cache:!1,contentType:!1,processData:!1}).success(S).always(function(){O(),T.removeClass("loading")}),!1})}else e("#js-slots-btn-sqm").addClass("disabled"),k("Your browser does not support file upload")}(window.jQuery);
//# sourceMappingURL=create.js.map
