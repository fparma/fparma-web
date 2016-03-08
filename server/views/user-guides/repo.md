# Setting up the repository

FPARMA is using several mods that adds new content and enhances the gameplay. We try to keep the size down but expect it to be just below 20GB.



## Installation
To get all addons, you need to first have <a href="https://www.java.com/download/" target="_blank">Java</a> installed, and then download <a href="http://www.armaholic.com/page.php?id=22199" target="_blank">Arma3Sync</a>. Once you have that, follow the steps below

1. Click the `Repositories` tab.
2. Click the **blue plus sign** on the right to add a new repo.
3. Give the repo a name of your liking under **Repository Name**.
4. In the **URL** box, enter <span id="js-ftp">`ftp://cdn.prfn.se/arma/`</span>, port should be `21`.
5. Tick `Anonymous` and hit the `OK` button
6. You can choose to be notified of updates by ticking the `Notify` checkbox.

The repo should now be added and saved.

## Downloading / updating the repo
1. Under the `Repositories` tab, click the **white paper and blue arrow** button.s
2. Click the **Green check** button under "**Check for addons**".
3. Tick `Select all` checkbox once the check is complete
4. Click the **black play** button under "**Download addons**" to begin downloading.

Once the download is complete, A3S should notify you that it has detected **ACRE** if it's the first time you're downloading, go ahead and proceed with the install and follow the instructions. If you do not get this notification, you can find it in the top menu under **Tools**


## Using A3S to launch your game
This is optional, you can use whatever launcher you want, just make sure you're running all addons in our repository.

1. Under the `Addons` tab, right-click in the right large field, labeled **Addon Groups** and select **Add Group**.
2. Drag and drop addons from the left side to your recently added group.
3. Make sure to tick the group or the individual addons you want to lauch the game with.
4. Click `Start game`.

---

#### Optional client-side addons
The below addons are not included in the modpack but can still be used, if you want.

- <a href="http://www.armaholic.com/page.php?id=26780" target="_blank">LAxemann's Enhanced Soundscape</a>
- <a href="http://www.armaholic.com/page.php?id=27827" target="_blank">JSRS</a>
- <a href="http://www.armaholic.com/page.php?id=23438" target="_blank">HeadRange Plus (for TrackIR)</a>

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
