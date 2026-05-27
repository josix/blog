import React, { useEffect, useState } from "react"

const ProgressBar = ({ visible }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!visible) return undefined
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight
        const pct = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
        setProgress(pct)
        raf = 0
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 50,
        transform: `scaleX(${progress})`,
        transformOrigin: "left",
        backgroundColor: "var(--accent)",
        willChange: "transform",
        pointerEvents: "none",
      }}
    />
  )
}

export default ProgressBar
