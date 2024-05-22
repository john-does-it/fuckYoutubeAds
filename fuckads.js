// ==UserScript==
// @name         FuckAds - Skip YouTube ads
// @namespace    http://tampermonkey.net/
// @version      1.3.3
// @description  Automatically skip (most of) YouTube ads and hide YouTube Ad Slots.
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/484915/FuckAds%20-%20Skip%20YouTube%20ads.user.js
// @updateURL https://update.greasyfork.org/scripts/484915/FuckAds%20-%20Skip%20YouTube%20ads.meta.js
// ==/UserScript==

(function () {
  const messageDiv = document.createElement('div')

  function createMessage () {
    messageDiv.style.cssText = 'position: fixed; bottom: 10px; left: 10px; background: #0f0f0f; color: white; border: 1px solid white; padding: 8px; border-radius: 8px; z-index: 999;'
    messageDiv.textContent = 'Ad muted and hidden by FuckAds, will be skipped ASAP if possible, if not you just need to wait. Keep your mind ad-free.'
  }

  function hideAdsSlot () {
    const youTubeAdsSlot = document.querySelectorAll('ytd-ad-slot-renderer')

    if (youTubeAdsSlot) {
      for (let i = 0; i < youTubeAdsSlot.length; i++) {
        youTubeAdsSlot[i].innerHTML = 'ADS HIDDEN AND MUTED BY FUCK ADS USER SCRIPT'
        youTubeAdsSlot[i].style.height = '100%'
        youTubeAdsSlot[i].style.display = 'flex'
        youTubeAdsSlot[i].style.color = 'white'
        youTubeAdsSlot[i].style.justifyContent = 'center';
        youTubeAdsSlot[i].style.alignItems = 'center';
      }
    }
  }
  setInterval(hideAdsSlot, 3000)

  function startObserving () {
    if (location.href.includes('/watch')) {
      const player = document.getElementById('movie_player')
      const innerPlayer = document.querySelector('.html5-video-container')

      if (player.classList.contains('ad-showing')) {
        document.body.appendChild(messageDiv)
        console.log('Ad detected.')
        innerPlayer.style.filter = 'blur(45px)'
        player.mute()
        createMessage()
      }

      if (!player.classList.contains('ad-showing')) {
        console.log('No ad detected')
        player.style.opacity = 1
        player.unMute()
        innerPlayer.style.filter = 'blur(0)'
        messageDiv.style.zIndex = '-999'
      }
    }
  }
  setInterval(startObserving, 2000)
})()
