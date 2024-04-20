// ==UserScript==
// @name         FuckAds - Skip YouTube ads
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Automatically skip (most of) YouTube ads and hide YouTube Ad Slots.
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL  https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.user.js
// @updateURL    https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.meta.js
// ==/UserScript==

(function () {
  function hideAdsSlot () {
    const youTubeAdsSlot = document.querySelectorAll('ytd-ad-slot-renderer')

    if (youTubeAdsSlot) {
      for (let i = 0; i < youTubeAdsSlot.length; i++) {
        youTubeAdsSlot[i].innerHTML = 'ADS HIDDEN BY FUCK ADS USER SCRIPT'
        youTubeAdsSlot[i].style.height = '100%'
        youTubeAdsSlot[i].style.display = 'flex'
        youTubeAdsSlot[i].style.color = 'white'
        youTubeAdsSlot[i].style.justifyContent = 'center';
        youTubeAdsSlot[i].style.alignItems = 'center';
      }
    }
  }
  setInterval(hideAdsSlot, 3000)

  function startObserving () {
    if (location.href.includes('/watch')) {
      const player = document.getElementById('movie_player')
      const skipButton = document.querySelector('.ytp-ad-skip-button-text')

      console.log(player, skipButton)

      if (skipButton) {
        skipButton.click()
      }

      /* This is only usefull for debugging */
      /*
      if (!player) {
        console.log('Player not detected.')
      }
      if (player.classList.contains('ad-showing') && !skipButton) {
        console.log('Ad detected. No skip button available, you need to wait.')
      }
      if (skipButton) {
        console.log('Skip button available')
      }
      if (!player.classList.contains('ad-showing')) {
        console.log('No ad detected')
      }
      */
    }
  }
  setInterval(startObserving, 5000)
})()
