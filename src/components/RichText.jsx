// Renders plain case-study text cleanly: blank lines = paragraphs, "- " lines = bullet list,
// "**bold**" = bold, and any stray markdown heading marks (#) are dropped.
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i} className="font-600 text-ink">{part.slice(2, -2)}</strong> : part,
  )
}

export default function RichText({ text = '', className = '' }) {
  const blocks = String(text).replace(/\r/g, '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((b, i) => {
        const lines = b.split('\n').map((l) => l.trim()).filter(Boolean)
        if (lines.every((l) => /^[-*•]\s+/.test(l))) {
          return (
            <ul key={i} className="space-y-2">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{inline(l.replace(/^[-*•]\s+/, ''))}</span>
                </li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{inline(lines.join(' ').replace(/^#+\s*/, ''))}</p>
      })}
    </div>
  )
}
