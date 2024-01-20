// ==UserScript==
// @name         FuckAds - A Youtube pub skipper
// @namespace    http://tampermonkey.net/
// @version      4.3.1
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
  let adSkipped
  // Function to skip the ad if present
  function skipAd () {
    adSkipped = false
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
    if (player && player.classList.contains('ad-showing')) {
      skipAd()
    }
  }

  // Function to check the player state and play the video if not playing
  function checkPlayerState () {
    const player = document.getElementById('movie_player')
    if (player && player.getPlayerState() !== 1) { // 1 is the state code for playing
      player.playVideo()
    }
  }

  // Function to check for URL change and reset adSkipped flag
  function checkUrlChange () {
    if (location.href.includes('/watch') && !adSkipped) {
      adSkipped = false
      startObserving()
    }
  }

  // Initialize script
  skipAd()

  setInterval(checkPlayerState, 3000) // Check player state every 10 seconds
  setInterval(checkUrlChange, 1000) // Continuously check for URL change
})()
