import { useRef, useEffect } from 'react'

export const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    const track = trackRef.current
    const thumb = thumbRef.current

    if (!scrollContainer || !track || !thumb) return

    const updateThumbPosition = () => {
      if (!scrollContainer || !track || !thumb) return

      const scrollWidth = scrollContainer.scrollWidth
      const clientWidth = scrollContainer.clientWidth

      if (scrollWidth <= clientWidth) {
        track.style.display = 'none'
        thumb.style.display = 'none'
        return
      }

      track.style.display = 'block'
      thumb.style.display = 'block'

      const thumbWidth = Math.max(20, (clientWidth / scrollWidth) * track.clientWidth)
      thumb.style.width = `${thumbWidth}px`

      const scrollLeft = scrollContainer.scrollLeft
      const maxScrollLeft = scrollWidth - clientWidth
      const trackWidth = track.clientWidth - thumbWidth
      const thumbLeft = (scrollLeft / maxScrollLeft) * trackWidth

      thumb.style.left = `${thumbLeft}px`
    }

    updateThumbPosition()

    scrollContainer.addEventListener('scroll', updateThumbPosition)

    const resizeObserver = new ResizeObserver(updateThumbPosition)
    resizeObserver.observe(scrollContainer)

    let isDragging = false
    let startX = 0
    let startScrollLeft = 0

    thumb.addEventListener('mousedown', (e) => {
      isDragging = true
      startX = e.clientX
      startScrollLeft = scrollContainer.scrollLeft
      document.body.style.userSelect = 'none'
    })

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return

      const dx = e.clientX - startX
      const scrollWidth = scrollContainer.scrollWidth
      const clientWidth = scrollContainer.clientWidth
      const trackWidth = track.clientWidth - thumb.clientWidth

      const scrollAmount = (dx / trackWidth) * (scrollWidth - clientWidth)
      scrollContainer.scrollLeft = startScrollLeft + scrollAmount
    })

    document.addEventListener('mouseup', () => {
      isDragging = false
      document.body.style.userSelect = ''
    })

    return () => {
      scrollContainer.removeEventListener('scroll', updateThumbPosition)
      resizeObserver.disconnect()

      thumb.removeEventListener('mousedown', () => {})
      document.removeEventListener('mousemove', () => {})
      document.removeEventListener('mouseup', () => {})
    }
  }, [])

  return { scrollRef, trackRef, thumbRef }
}
