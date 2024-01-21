// ==UserScript==
// @name         FuckAds - Hide and mute YouTube ads
// @namespace    http://tampermonkey.net/
// @version      5.2.7
// @description  Automatically hide and mutes/unmutes YouTube ads.
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
  message.style.cssText = 'position: fixed; top: 50%; left: 0; background: red; color: white; padding: 10px; z-index: -1; border-radius: 20px;'

  let adSkipped = false
  let previousUrl = location.href

  function startObserving () {
    if (location.href.includes('/watch')) {
      const player = document.getElementById('movie_player')
      const skipButton = document.querySelector('.ytp-ad-skip-button-text')

      message.style.zIndex = '999'

      if (!player) {
        message.innerText = 'Player not detected.'
      }

      if (player.classList.contains('ad-showing') && !skipButton) {
        player.mute()
        player.style.filter = 'blur(100px)'
        message.innerText = 'Ad detected. No skip button available, you need to wait.'
      }

      if (player.classList.contains('ad-showing') && skipButton) {
        player.mute()
        player.style.filter = 'blur(none)'
        message.innerText = 'Skip button available.'
        return
      }

      if (!player.classList.contains('ad-showing')) {
        message.style.zIndex = '-999'
        player.unMute()
        player.style.filter = 'blur(0px)'
        adSkipped = true
      }
    }
  }

  function checkUrlChange () {
    const currentUrl = location.href
    const skipButton = document.querySelector('.ytp-ad-skip-button-text')

    // try to skip the ad by clicking on the skip button, doesn't work all the time
    if (skipButton) {
      skipButton.click()
    }

    if (!adSkipped && currentUrl !== previousUrl) {
      adSkipped = false
      previousUrl = currentUrl
      console.log('startObserving()')
      startObserving()
    }
  }

  setInterval(checkUrlChange, 1000)
  setInterval(startObserving, 1000)
})()
