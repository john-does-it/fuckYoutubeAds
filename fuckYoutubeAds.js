// ==UserScript==
// @name         FuckYoutubeAds
// @namespace    http://tampermonkey.net/
// @version      1.4.8
// @description  Automatically mute and blur video YouTube ads and hide YouTube static ads from feed
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  const messageDiv = document.createElement('div')
  let latestVolume = 100
  let inAd = false

  function createMessage() {
    messageDiv.style.cssText =
    'position: fixed; bottom: 10px; left: 10px; ' +
    'background: #0f0f0f; color: white; ' +
    'border: 1px solid white; padding: 8px; ' +
    'border-radius: 8px; z-index: 999;'
    messageDiv.textContent =
    'Ad muted and blurred by FuckYoutubeAds. Keep your mind ad-free. 🧠🕊️'
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

  function startObserving() {
    if (!location.href.includes('/watch')) return
    const player = document.getElementById('movie_player')
    const innerPlayer = document.querySelector('.html5-video-container')
    if (!player || !innerPlayer) return

    const isAd = player.classList.contains('ad-showing')

    if (isAd) {
      // ——— ad just started? ———
      if (!inAd) {
        latestVolume = player.getVolume()
        inAd = true
        document.body.appendChild(messageDiv)
        createMessage()
        console.log('▶️ Ad started storing volume', latestVolume)
      }
      // mute + blur
      innerPlayer.style.filter = 'blur(45px)'
      player.setVolume(0)
    } else {
      // ——— ad just ended? ———
      if (inAd) {
        player.setVolume(latestVolume)
        inAd = false
        console.log('⏹️ Ad ended restoring volume', latestVolume)
      }
      // un-blur + hide message
      innerPlayer.style.filter = ''
      if (messageDiv.parentNode) messageDiv.remove()
    }
  }
  setInterval(startObserving, 1000)
})()
