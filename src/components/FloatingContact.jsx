import { Mail } from 'lucide-react'
import { WhatsAppIcon } from './Icons'

export const waLink = (profile) =>
  `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(`Hi ${profile.first}, saw your portfolio and would love to connect.`)}`

// md+ only. They sit inside the right gutter (.with-dock reserves it), so they never cover a card.
// On mobile the same two buttons live in the top bar instead (see Nav.jsx).
export default function FloatingContact({ profile }) {
  return (
    <div className="fixed bottom-6 right-[14px] z-[70] hidden flex-col gap-3 md:flex">
      {profile?.email && (
        <a href={`mailto:${profile.email}`} aria-label="Email me" title="Email me"
          className="grid h-11 w-11 place-items-center rounded-full bg-accent text-black transition-transform hover:-translate-y-0.5">
          <Mail size={19} />
        </a>
      )}
      {profile?.whatsapp && (
        <a href={waLink(profile)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp"
          className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white transition-transform hover:-translate-y-0.5">
          <WhatsAppIcon size={21} />
        </a>
      )}
    </div>
  )
}
