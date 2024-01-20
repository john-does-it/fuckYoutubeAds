// ==UserScript==
// @name         FuckAds - A Youtube pub skipper
// @namespace    http://tampermonkey.net/
// @version      4.5.3
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
  let adDetected = false
  const player = document.getElementById('movie_player')
  const skipButton = document.querySelector('.ytp-ad-skip-button-text')
  const messageDiv = document.createElement('div')
  document.body.appendChild(messageDiv)

  messageDiv.style.cssText = 'position: fixed; top: 50%; left: 0; background: red; color: white; padding: 10px; z-index: 999;'

  function skipAd () {
    player.style.zIndex = '-999'
    player.mute()

    if (player && skipButton && !adSkipped & adDetected) {
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
      messageDiv.style.zIndex = '999'
      messageDiv.innerText = 'player not detected'
      return
    }
    if (!player.classList.contains('ad-showing')) {
      messageDiv.innerText = 'no ad detected'
      player.style.zIndex = '999'
      player.unMute()
      adDetected = false
      return
    }
    if (player && player.classList.contains('ad-showing')) {
      messageDiv.style.zIndex = '999'
      messageDiv.innerText = 'player and ad detected'
      player.style.zIndex = '-999'
      player.mute()
      adDetected = true
      skipAd()
    }
    if (!skipButton) {
      messageDiv.style.zIndex = '999'
      messageDiv.innerText = 'player and ad detected, no skip button available, you need to wait'
    }
  }

  // Function to check for URL change and reset adSkipped flag
  function checkUrlChange () {
    if (location.href.includes('/watch') && !adSkipped) {
      startObserving()
    }
  }

  setInterval(checkUrlChange, 1000) // Continuously check for URL change
  setInterval(startObserving, 1000) // Continuously check for ad
})()
