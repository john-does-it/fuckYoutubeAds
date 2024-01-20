// ==UserScript==
// @name         FuckAds - A Youtube pub skipper
// @namespace    http://tampermonkey.net/
// @version      4.8.4
// @description  Automatically skips YouTube ads and mutes/unmutes video for Firefox (quickly tested) and Opera (extensively tested).
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL  https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.user.js
// @updateURL    https://update.greasyfork.org/scripts/484915/FuckAds%20-%20A%20Youtube%20pub%20skipper.meta.js
// ==/UserScript==

(function () {
  const message = document.createElement('div')
  document.body.appendChild(message)
  message.style.cssText = 'position: fixed; top: 50%; left: 0; background: red; color: white; padding: 10px; z-index: 999;'

  let adSkipped = false
  let previousUrl = location.href

  function skipAd () {
    const player = document.getElementById('movie_player')
    const skipButton = document.querySelector('.ytp-ad-skip-button-container')

    if (player && skipButton && adSkipped === false) {
      skipButton.click()
      adSkipped = true
    }
  }

  function startObserving () {
    if (location.href.includes('/watch')) {
      const player = document.getElementById('movie_player')
      const skipButton = document.querySelector('.ytp-ad-skip-button-text')

      console.log('startObserving () player, skipButton', player, skipButton)

      if (!player) {
        message.innerText = 'Player not detected.'
      }

      if (player.classList.contains('ad-showing') && !skipButton) {
        player.mute()
        // player.style.zIndex = '-999'
        message.innerText = 'Player and ad detected. No skip button available, you need to wait.'
        return
      }

      if (player.classList.contains('ad-showing') && skipButton) {
        player.mute()
        // player.style.zIndex = '999'
        message.innerText = 'Skip button available, ad will be skipped ASAP.'
        skipAd()
        console.log('skipAd()')
        return
      }

      if (!player.classList.contains('ad-showing')) {
        message.innerText = 'No ad detected.'
        player.unMute()
        // player.style.zIndex = '999'
        if (player.getPlayerState() !== 1 && adSkipped === false) {
          player.seekTo(0)
          player.playVideo()
        }
        adSkipped = true
      }
    }
  }

  function checkUrlChange () {
    const currentUrl = location.href

    if (!adSkipped && currentUrl !== previousUrl) {
      adSkipped = false
      previousUrl = currentUrl
      console.log('startObserving()')
      startObserving()
    }
  }

  setInterval(checkUrlChange, 1000)
  setInterval(startObserving, 3000)
})()
