// ==UserScript==
// @name         FuckAds - Hide and mute YouTube ads
// @namespace    http://tampermonkey.net/
// @version      5.2.1
// @description  Automatically hide and mutes/unmutes YouTube ads for Firefox (quickly tested) and Opera (extensively tested).
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
  message.style.cssText = 'position: fixed; top: 50%; left: 0; background: red; color: white; padding: 10px; z-index: -1;'
  const skipButton = document.querySelector('.ytp-ad-skip-button-text')

  let adSkipped = false
  let previousUrl = location.href

  function startObserving () {
    if (location.href.includes('/watch')) {
      message.style.zIndex = '999'
      const player = document.getElementById('movie_player')
      const skipButton = document.querySelector('.ytp-ad-skip-button-text')

      if (!player) {
        message.innerText = 'Player not detected.'
      }

      if (player.classList.contains('ad-showing')) {
        player.style.filter = 'blur(50px)'
      }

      if (player.classList.contains('ad-showing') && !skipButton) {
        player.mute()
        message.innerText = 'Player and ad detected. No skip button available, you need to wait.'
        return
      }

      if (player.classList.contains('ad-showing') && skipButton) {
        player.mute()
        player.style.filter = 'blur(5px)'
        skipButton.style.zIndex = '999'

        message.innerText = 'Skip button available.'
        skipButton.click()
        return
      }

      if (!player.classList.contains('ad-showing')) {
        message.style.zIndex = '-999'
        player.unMute()
        player.style.zIndex = '999'
        player.style.filter = 'blur(0px)'
        adSkipped = true
      }
    }
  }

  function checkUrlChange () {
    const currentUrl = location.href

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
