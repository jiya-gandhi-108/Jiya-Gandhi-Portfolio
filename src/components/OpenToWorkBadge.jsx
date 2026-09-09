import { ArrowUpRight } from 'lucide-react'

// Rotating circular text badge with an arrow in the middle — links to contact.
export default function OpenToWorkBadge({ className = '', size = 128 }) {
  const text = 'OPEN TO WORK • CONTACT ME • '
  return (
    <a href="/#contact" aria-label="Open to work — contact me"
      className={`group relative grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full bg-accent" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs><path id="badgecircle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="display" fontSize="9.5" fontWeight="600" fill="rgb(var(--bg))" letterSpacing="1.2">
          <textPath href="#badgecircle" startOffset="0">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-bg text-accent transition-transform group-hover:scale-110">
        <ArrowUpRight size={18} />
      </span>
    </a>
  )
}
