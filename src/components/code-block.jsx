import React, { useState, useRef } from "react"

const extractLang = className => {
  const match = /language-(\w+)/.exec(className || "")
  return match ? match[1] : ""
}

const extractText = node => {
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (node && node.props && node.props.children)
    return extractText(node.props.children)
  return ""
}

const CodeBlock = ({ children, ...rest }) => {
  const [copied, setCopied] = useState(false)
  const preRef = useRef(null)

  const codeProps = children && children.props ? children.props : {}
  const lang = extractLang(codeProps.className)
  const rawText = extractText(codeProps.children)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(rawText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      const el = preRef.current
      if (!el) return
      const sel = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(el)
      sel.removeAllRanges()
      sel.addRange(range)
      try {
        document.execCommand("copy")
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch (_) {}
      sel.removeAllRanges()
    }
  }

  return (
    <div
      className="code-block-wrapper"
      style={{ position: "relative", margin: "1.5rem 0" }}
    >
      <div
        className="code-meta"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.35rem 0.75rem",
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          borderBottom: "none",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        }}
      >
        <span style={{ textTransform: "lowercase", fontFamily: "monospace" }}>
          {lang || "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "0.75rem",
            padding: 0,
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        ref={preRef}
        {...rest}
        style={{
          marginTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        {children}
      </pre>
    </div>
  )
}

export default CodeBlock
