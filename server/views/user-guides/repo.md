# Setting up the repository

FPARMA is using several mods that adds new content and enhances the gameplay. The size is quite large so be sure to download it in time and test it out!

If you're having issues with ACRE (radios), try running TS3 and A3 as admin.

## Installation
We are using <a href="http://getswifty.net/" target="_blank">Swifty</a> as our repo downloader.

Download the installer and once opened, click the `+` sign in the upper right.
In the URL, enter <span id="js-ftp">`http://swifty.comfy.li/`</span>

After that Swifty should take care of the rest. 

We also allow the below client-side addons.
- <a href="http://www.armaholic.com/page.php?id=27827" target="_blank">JSRS</a>
- <a href="http://www.armaholic.com/page.php?id=23438" target="_blank">HeadRange Plus (for TrackIR)</a>
- <a href="http://www.armaholic.com/page.php?id=26780" target="_blank">LAxemann's Enhanced Soundscape</a>

<script type="text/javascript">
$(function () {
  if (!document.createRange) return
  $('#js-ftp').on('click', function () {
    var span = this
    var range = document.createRange();
    range.setStartBefore(span.firstChild);
    range.setEndAfter(span.lastChild);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  })
})
</script>
