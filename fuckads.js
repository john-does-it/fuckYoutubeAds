// ==UserScript==
// @name         YouTube Ad Skipper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically skips YouTube ads and mutes/unmutes video.
// @author       John Doe
// @match        *://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function () {
  let previousUrl = location.href // Initialize with the current URL
  let adSkipped = false
  let intervalId // Store the interval ID
  const messageDiv = document.createElement('div')
  let checkInterval = 1000 // Check every second

  function createMessage () {
    messageDiv.id = 'ad-skip-message'
    messageDiv.style.cssText = 'position: fixed; bottom: 0; left: 0; background: red; color: white; padding: 5px; z-index: 999;'
    messageDiv.textContent = 'Ad has been muted and hidden by FuckAds, will be skipped ASAP (if skippable). If not, you just need to wait. Keep your mind ad-free.'
    document.body.appendChild(messageDiv)
  }

  function skipAds () {
    if (!adSkipped) {
      const player = document.getElementById('movie_player')

      clearInterval(intervalId)

      player.mute()
      player.style.zIndex = '-999'

      intervalId = setInterval(() => {
        console.log('Interval running, adSkipped:', adSkipped)
        if (player.classList.contains('ad-showing')) {
          console.log('Ads detected')
          createMessage()
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
          messageDiv.style.Zindex = '-999'
          player.unMute()
          player.style.zIndex = '999'
          player.seekTo(0)
          player.playVideo()
          adSkipped = true
          checkInterval = 5000
        }
      }, checkInterval)
    }
  }

  function checkUrlChange () {
    if (location.href !== previousUrl) {
      console.log('Check for url change')
      previousUrl = location.href // Update previousUrl with the new URL
      adSkipped = false // Reset adSkipped flag on URL change
      location.reload() // Reload the page on URL change
    }
  }

  skipAds() // Run the script initially
  setInterval(checkUrlChange, 10000) // Continuously check for URL change
})()
