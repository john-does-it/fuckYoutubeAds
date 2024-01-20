// ==UserScript==
// @name         FuckAds - A Youtube pub skipper
// @namespace    http://tampermonkey.net/
// @version      4.4.2
// @description  Automatically skips YouTube ads and mutes/unmutes video for Firefox (quickly tested) and Opera (extensively tested).
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL  https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.user.js
// @updateURL    https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.meta.js
// ==/UserScript==

(function () {
  console.log('FuckAds script initialized')
  let adSkipped = false

  if (location.href.includes('/watch')) {
    console.log('URL includes /watch')
    adSkipped = false
    skipAd()
  }

  function skipAd () {
    const player = document.getElementById('movie_player')
    const skipButton = document.querySelector('.ytp-ad-skip-button-text')
    if (player && skipButton && !adSkipped) {
      skipButton.click()
      console.log('Ad skipped')
      adSkipped = true
      player.unMute()
      player.style.zIndex = '999'
      player.seekTo(0)
      player.playVideo()
    }
  }

  // Function to observe ad showing and skip it
  function startObserving () {
    const player = document.getElementById('movie_player')
    if (!player) {
      console.log('player not detected')
      return
    }
    if (!player.classList.contains('ad-showing')) {
      console.log('no ad detected')
      return
    }
    if (player && player.classList.contains('ad-showing')) {
      console.log('player and ad detected')
      skipAd()
    }
  }

  // Function to check for URL change and reset adSkipped flag
  function checkUrlChange () {
    if (location.href.includes('/watch') && !adSkipped) {
      startObserving()
    }
  }

  // Initialize script
  skipAd()

  setInterval(checkUrlChange, 1000) // Continuously check for URL change
  setInterval(startObserving, 1000) // Continuously check for ad
})()
