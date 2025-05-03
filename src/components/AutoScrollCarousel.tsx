"use client"
import React, { useEffect, useRef, useState } from 'react'

export default function AutoScrollCarousel({ children }: { children: React.ReactNode }) {
  const [duration] = useState(30)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return

    const container = containerRef.current
    const scroller = scrollerRef.current
    
    // 复制内容以实现无缝滚动
    scroller.innerHTML += scroller.innerHTML

    // 自动滚动动画
    const animation = scroller.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${scroller.scrollWidth / 2}px)` }
      ],
      {
        duration: duration * 3000,
        iterations: Infinity
      }
    )

    // 悬停暂停
    const handleMouseEnter = () => animation.pause()
    const handleMouseLeave = () => animation.play()
    
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      animation.cancel()
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [duration])

  return (
    <div 
      ref={containerRef}
      className="flex max-w-7xl mx-auto overflow-hidden gap-6 py-2"
    >
      <div
        ref={scrollerRef}
        className="flex w-max gap-6 py-2"
      >
        {children}
      </div>
    </div>
  )
}