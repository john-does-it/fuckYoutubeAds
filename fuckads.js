// ==UserScript==
// @name         FuckAds - Mute and hide YouTube ads
// @namespace    http://tampermonkey.net/
// @version      1.3.9
// @description  Automatically mute and hide YouTube ads and hide YouTube Ad Slots.
// @author       John Doe
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  const messageDiv = document.createElement('div')
  
  function createMessage () {
    messageDiv.style.cssText = 'position: fixed; bottom: 10px; left: 10px; background: #0f0f0f; color: white; border: 1px solid white; padding: 8px; border-radius: 8px; z-index: 999;'
    messageDiv.textContent = 'Ad muted and blurred by FuckAds. Keep your mind ad-free. 🧠🕊️'
  }
  
  function hideAdsSlot () {
    const youTubeAdsSlot = document.querySelectorAll('ytd-display-ad-renderer') // ads on main feed
    const youTubeAdsSlot2 = document.querySelectorAll('ytd-ad-inline-playback-meta-block') // more ads on main feed
    const youTubeAdsSlot3 = document.querySelector('#player-ads') // single sponsored container with a cta on /watch/...
    const youTubeAdsSlot4 = document.getElementsByClassName('ytp-ad-avatar-lockup-card') // single ad slot on bottom left of the player related to the current ad running on when watching a vid on /watch 
    const youTubeAdsSlot5 = document.getElementsByClassName('ytd-in-feed-ad-layout-renderer') // more ads on main feeds
    const youTubeAdsSlot6 = document.getElementsByTagName('ytd-ad-slot-renderer') // more ads slot on /watch feeds

    if (youTubeAdsSlot) {
      for (let i = 0; i < youTubeAdsSlot.length; i++) {
        youTubeAdsSlot[i].innerText = 'Ads hidden by FuckAds'
        youTubeAdsSlot[i].style.height = '100%'
        youTubeAdsSlot[i].style.display = 'flex'
        youTubeAdsSlot[i].style.color = 'white'
        youTubeAdsSlot[i].style.justifyContent = 'center';
        youTubeAdsSlot[i].style.alignItems = 'center';
      }
    }
    
    if (youTubeAdsSlot2) {
      for (let i = 0; i < youTubeAdsSlot2.length; i++) {
        youTubeAdsSlot2[i].innerText = 'Ads hidden by FuckAds'
        youTubeAdsSlot2[i].style.height = '100%'
        youTubeAdsSlot2[i].style.display = 'flex'
        youTubeAdsSlot2[i].style.color = 'white'
        youTubeAdsSlot2[i].style.justifyContent = 'center'
        youTubeAdsSlot2[i].style.alignItems = 'center'
      }
    }
    
    if (youTubeAdsSlot3) {
      youTubeAdsSlot3.style.display = 'none'
    }
    
    if (youTubeAdsSlot4) {
      for (let adSlot of youTubeAdsSlot4) {
        adSlot.style.display = 'none'      
      }
    }

    if (youTubeAdsSlot5) {
      for (let adSlot of youTubeAdsSlot5) {
        adSlot.style.display = 'none'
      }
    }

    if (youTubeAdsSlot6) {
      for (let adSlot of youTubeAdsSlot6) {
        adSlot.style.display = 'none'
      }
    }
  }
  setInterval(hideAdsSlot, 3000)
  
  function startObserving () {
    if (location.href.includes('/watch')) {
      const player = document.getElementById('movie_player')
      const innerPlayer = document.querySelector('.html5-video-container')
      const skipButton = document.querySelector('.ytp-ad-skip-button') || document.querySelector('.ytp-skip-ad-button') || document.querySelector('.ytp-ad-skip-button-modern')

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

      if (skipButton) {
        skipButton.click()
      }
    }
  }
  setInterval(startObserving, 2000)
})()