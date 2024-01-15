// ==UserScript==
// @name         YouTube Ad Skipper
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Automatically skips YouTube ads and mutes/unmutes video.
// @author       John Doe
// @match        *://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function () {
  if (location.href.includes('/watch')) {
    console.log('URL includes /watch')
    let adSkipped = false
    const messageDiv = document.createElement('div')

    function createMessage () {
      messageDiv.id = 'ad-skip-message'
      messageDiv.style.cssText = 'position: fixed; bottom: 50%; left: 50%; background: red; color: white; padding: 5px; z-index: 999;'
      messageDiv.textContent = 'Ad muted and hidden by FuckAds, will be skipped ASAP if possible, if not you just need to wait. Keep your mind ad-free.'
      document.body.appendChild(messageDiv)
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
        createMessage()
        player.mute()
        player.style.zIndex = '-999'
        skipAd()
      }
    }

    function checkUrlChange () {
      if (location.href.includes('/watch')) {
        adSkipped = false
        startObserving()
      }
    }

    startObserving()
    setInterval(checkUrlChange, 1000) // Continuously check for URL change
  }
})()
