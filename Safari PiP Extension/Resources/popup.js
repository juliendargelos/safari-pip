const videosList = document.querySelector('ul')

browser.tabs.query({
  active: true,
  currentWindow: true
}, async (tabs) => {
  const tabId = tabs[0].id
  const { videos, pip } = await browser.tabs.sendMessage(tabId, { message: 'getVideos' })
  
  if (!videos) {
    return
  }
  
  videosList.innerHTML = ''

  for (let i = 0; i < videos; i++) {
    const item = document.createElement('li')
    const label = document.createElement('span')
    label.textContent = `Video #${i + 1}`
    
    item.classList.toggle('selected', i === pip)
    
    item.addEventListener('click', async () => {
      for (const other of item.parentNode.children) {
        other.classList.remove('selected')
      }
      
      if (pip === i) {
        browser.tabs.sendMessage(tabId, { message: 'leavePip' })
        window.close()
      } else {
        const { message } = await browser.tabs.sendMessage(tabId, { message: 'enterPip', index: i })
        
        if (message === 'success') {
          window.close()
        } else {
          item.textContent = 'Click on the page to enter PiP'
          item.classList.add('alert')
        }
      }
    })
    
    item.appendChild(label)
    videosList.appendChild(item)
    
    if (videos === 1) {
      item.click()
    }
  }
})
