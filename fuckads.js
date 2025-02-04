// ==UserScript==
// @name         FuckAds - Mute and hide YouTube ads
// @namespace    http://tampermonkey.net/
// @version      1.4.4
// @description  Automatically mute and hide YouTube ads and hide YouTube Ad Slots.
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/484915/FuckAds%20-%20Mute%20and%20hide%20YouTube%20ads.user.js
// @updateURL https://update.greasyfork.org/scripts/484915/FuckAds%20-%20Mute%20and%20hide%20YouTube%20ads.meta.js
// ==/UserScript==

(function () {
  const messageDiv = document.createElement('div')

  function createMessage () {
    messageDiv.style.cssText = 'position: fixed; bottom: 10px; left: 10px; background: #0f0f0f; color: white; border: 1px solid white; padding: 8px; border-radius: 8px; z-index: 999;'
    messageDiv.textContent = 'Ad muted and blurred by FuckAds. Keep your mind ad-free. 🧠🕊️'
  }

  function hideAdsSlot () {
    /* ads on main feed */
    const youTubeAdsSlotMainFeed = document.getElementsByClassName('ytd-in-feed-ad-layout-renderer')

    /* big banner on top of main feed to incentive to buy YouTube Premium */
    const youTubePremiumAdSlot = document.getElementsByTagName('ytd-banner-promo-renderer')

    /* ads slot on /watch feed */
    const youTubeAdsWatchFeed = document.getElementsByClassName('ytp-ad-avatar-lockup-card') 
    const youTubeAdsWatchFeed2 = document.getElementsByTagName('ytd-ad-slot-renderer')

    /* single sponsored container with a cta on /watch */
    const youTubeSponsoredAdSlot = document.querySelector('#player-ads') 

    if (youTubeAdsSlotMainFeed) {
      for (let adSlot of youTubeAdsSlotMainFeed) {
        adSlot.style.display = 'none'
      }
    }

    if (youTubePremiumAdSlot) {
      for (let adSlot of youTubePremiumAdSlot) {
        adSlot.style.display = 'none'
      }
    }

    if (youTubeAdsWatchFeed) {
      for (let adSlot of youTubeAdsWatchFeed) {
        adSlot.style.display = 'none'
      }
    }

    if (youTubeAdsWatchFeed2) {
      for (let adSlot of youTubeAdsWatchFeed2) {
        adSlot.style.display = 'none'
      }
    }

    if (youTubeSponsoredAdSlot) {
      youTubeSponsoredAdSlot.style.display = 'none'
    }
  }
  setInterval(hideAdsSlot, 3000)

  function startObserving () {
    if (location.href.includes('/watch')) {
      const player = document.getElementById('movie_player')
      const innerPlayer = document.querySelector('.html5-video-container')

      if (player.classList.contains('ad-showing')) {
        console.log('Ad detected.')
        document.body.appendChild(messageDiv)
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
  setInterval(startObserving, 1000)
})()