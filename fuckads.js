// ==UserScript==
// @name         FuckAds - A Youtube pub skipper
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Automatically skips YouTube ads and mutes/unmutes video.
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.user.js
// @updateURL https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.meta.js
// ==/UserScript==

(function () {
  console.log('fuckads')
  let adSkipped
  const messageDiv = document.createElement('div')

  if (location.href.includes('/watch')) {
    console.log('URL includes /watch')
    adSkipped = false
    skipAd()
  }

  function skipAd () {
    if (adSkipped === false) {
      const player = document.getElementById('movie_player')
      const skipButton = document.querySelector('.ytp-ad-skip-button-text')
      if (player && skipButton) {
        skipButton.click()
        console.log('Ad skipped')
      }
      adSkipped = true
      messageDiv.style.zIndex = '-999'
      player.unMute()
      player.style.zIndex = '999'
      player.seekTo(0)
      player.playVideo()
    }
  }

  function startObserving () {
    const player = document.getElementById('movie_player')
    if (player && player.classList.contains('ad-showing')) {
      player.mute()
      player.style.zIndex = '-999'
      skipAd()
    }
  }
  startObserving()

  function checkUrlChange () {
    if (location.href.includes('/watch')) {
      adSkipped = false
      startObserving()
    }
  }

  setInterval(checkUrlChange, 1000) // Continuously check for URL change
})()
