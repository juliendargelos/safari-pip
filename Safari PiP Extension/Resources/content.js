let videos = []
let video = undefined
let sendPiPResponse

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  switch (request.message) {
    case 'getVideos':
      videos = [...document.querySelectorAll('video')]
      sendResponse({
        videos: videos.length,
        pip: videos.findIndex(video => (
          video === document.pictureInPictureElement
        ))
      })
      document.documentElement.removeEventListener('click', requestPictureInPicture)
      break
    
    case 'enterPip':
      try {
        await document.exitPictureInPicture()
      } catch (_) {
        
      }
      
      sendPiPResponse = sendResponse
      video = videos[request.index]
      document.documentElement.removeEventListener('click', requestPictureInPicture)
      document.documentElement.addEventListener('click', requestPictureInPicture)
      document.documentElement.click()
      break
    
    case 'leavePip':
      try {
        document.exitPictureInPicture()
      } catch (_) {
        
      }
      
      sendResponse({ message: 'success' })
      break
  }
})

async function requestPictureInPicture() {
  if (!video || !sendPiPResponse) {
    return
  }
  
  try {
    await video.requestPictureInPicture()
  } catch (_) {
    sendPiPResponse({ message: 'error' })
    return
  }
  
  video = undefined
  document.documentElement.removeEventListener('click', requestPictureInPicture)
  sendPiPResponse({ message: 'success' })
}
