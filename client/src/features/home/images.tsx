import React, { useState, useEffect } from 'react'

const urls = [
  'https://cdn.discordapp.com/attachments/333712698808205312/544267574943416337/Desktop_Screenshot_2019.02.10_-_21.50.52.46.png',
]

const lazyLoad = ['https://my.mixtape.moe/cevkaw.png']

const preloadNextImage = () => {
  if (!lazyLoad.length) return
  const img = new Image()
  img.src = lazyLoad.shift() as string
  img.onload = () => urls.push(img.src)
}

const getNextImage = (url: string) => {
  const idx = urls.findIndex(v => v === url) + 1
  return idx >= urls.length ? urls[0] : urls[idx]
}

export const useCycleImages = () => {
  const [url, setUrl] = useState(urls[0])

  useEffect(() => {
    const nextInterval = setInterval(() => setUrl(getNextImage(url)), 8000)
    const preloadInterval = setInterval(() => preloadNextImage(), 4000)
    return () => [nextInterval, preloadInterval].forEach(clearInterval)
  }, [url])

  return { url }
}
