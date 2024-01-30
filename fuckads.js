// ==UserScript==
// @name         FuckAds - Skip YouTube ads
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically skip YouTube ads.
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL  https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.user.js
// @updateURL    https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.meta.js
// ==/UserScript==

(function () {
  function startObserving () {
    if (location.href.includes('/watch')) {
      const player = document.getElementById('movie_player')
      const skipButton = document.querySelector('.ytp-ad-skip-button-text')

      console.log(player, skipButton)

      skipButton.click()

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
