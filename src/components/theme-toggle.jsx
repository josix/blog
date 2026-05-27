import React, { useEffect, useState } from "react"

const resolveTheme = pref => {
  if (pref !== "system") return pref
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

const applyTheme = pref => {
  if (typeof document === "undefined") return
  document.documentElement.dataset.theme = resolveTheme(pref)
  document.documentElement.dataset.themePreference = pref
}

const ThemeToggle = () => {
  const [pref, setPref] = useState("system")

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" && localStorage.getItem("theme")) ||
      "system"
    setPref(stored)
  }, [])

  useEffect(() => {
    if (pref !== "system") return undefined
    if (typeof window === "undefined") return undefined
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => applyTheme("system")
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [pref])

  const choose = next => {
    setPref(next)
    try {
      localStorage.setItem("theme", next)
    } catch (e) {}
    applyTheme(next)
  }

  const baseBtn = {
    padding: "0.25rem 0.4rem",
    background: "transparent",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-secondary)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const activeBtn = {
    ...baseBtn,
    background: "var(--bg-elevated)",
    color: "var(--text-primary)",
    borderColor: "var(--accent)",
  }

  return (
    <div
      role="group"
      aria-label="Theme selector"
      style={{ display: "inline-flex", gap: "0.25rem" }}
    >
      <button
        type="button"
        aria-label="System theme"
        aria-pressed={pref === "system"}
        style={pref === "system" ? activeBtn : baseBtn}
        onClick={() => choose("system")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Light theme"
        aria-pressed={pref === "light"}
        style={pref === "light" ? activeBtn : baseBtn}
        onClick={() => choose("light")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Dark theme"
        aria-pressed={pref === "dark"}
        style={pref === "dark" ? activeBtn : baseBtn}
        onClick={() => choose("dark")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  )
}

export default ThemeToggle
