// ==UserScript==
// @name         YouTube Ad Skipper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically skips YouTube ads and mutes/unmutes video.
// @author       You
// @match        *://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function () {
  let previousUrl = location.href // Initialize with the current URL
  let adSkipped = false
  let intervalId // Store the interval ID

  function createMessage () {
    const messageDiv = document.createElement('div')
    messageDiv.id = 'ad-skip-message'
    messageDiv.style.cssText = 'position: fixed; bottom: 0; left: 0; background: red; color: white; padding: 5px; z-index: 999;'
    messageDiv.textContent = 'Ad muted and hidden by FuckAds, will be skipped ASAP if possible, if not you just need to wait. Keep your mind ad-free.'
    document.body.appendChild(messageDiv)
  }

  function removeMessage () {
    const messageDiv = document.getElementById('ad-skip-message')
    if (messageDiv) {
      messageDiv.parentNode.removeChild(messageDiv)
    }
  }

  function skipAds () {
    if (!adSkipped) {
      const checkInterval = 1000 // Check every second
      const player = document.getElementById('movie_player')

      clearInterval(intervalId)

      createMessage()

      player.mute()
      player.style.zIndex = '-999'

      intervalId = setInterval(() => {
        console.log('Interval running, adSkipped:', adSkipped)
        if (player.classList.contains('ad-showing')) {
          console.log('Ads detected')
          const skipButton = document.querySelector('.ytp-ad-skip-button-text')
          console.log('Skip button:', skipButton)
          if (skipButton) {
            skipButton.click()
            console.log(skipButton.click())
            skipButton.style.zIndex = '999'
          }
        }

        if (!player.classList.contains('ad-showing') && !adSkipped) {
          console.log('No ads detected, removing message and unmuting')
          removeMessage()
          player.unMute()
          player.style.zIndex = '999'
          player.seekTo(0)
          player.playVideo()
          adSkipped = true
        }
      }, checkInterval)
    } else {
      console.log('Ad already skipped, waiting for next video')
    }
  }

  function checkUrlChange () {
    if (location.href !== previousUrl) {
      previousUrl = location.href // Update previousUrl with the new URL
      adSkipped = false // Reset adSkipped flag on URL change
      location.reload() // Reload the page on URL change
    }
  }

  skipAds() // Run the script initially
  setInterval(checkUrlChange, 1000) // Continuously check for URL change
})()
