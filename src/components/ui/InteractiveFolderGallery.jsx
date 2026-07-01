import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FolderOpen, X } from 'lucide-react'

const defaultPartners = [
  { id: 'levys', name: 'Levy’s', detail: 'Founding partner · Nashville', status: 'Live', logo: '/assets/levys-logo.png' },
  { id: 'north-mercer', name: 'North & Mercer', detail: 'Future boutique partner', status: 'Placeholder', initials: 'N&M' },
  { id: 'alder-house', name: 'Alder House', detail: 'Future boutique partner', status: 'Placeholder', initials: 'AH' },
  { id: 'forme', name: 'Forme', detail: 'Future boutique partner', status: 'Placeholder', initials: 'F' },
  { id: 'common-thread', name: 'Common Thread', detail: 'Future boutique partner', status: 'Placeholder', initials: 'CT' },
]

export function InteractiveFolderGallery({ partners = defaultPartners, folderName = 'MaisonMatch Partner Directory', className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 700)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return <div className={`partner-folder-gallery ${isOpen ? 'is-open' : ''} ${className}`}>
    <div className="folder-stage">
      <motion.div className="folder-back" animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? .94 : 1 }} transition={{ duration: reduceMotion ? 0 : .25 }} aria-hidden="true"><span/></motion.div>

      <div className="partner-files" aria-live="polite">
        {partners.map((partner, index) => {
          const offset = index - Math.floor(partners.length / 2)
          const mobileOpenPositions = [
            { x: -34, y: -58, rotate: -5, scale: .98 },
            { x: 42, y: -96, rotate: 4, scale: .88 },
            { x: -10, y: -124, rotate: -1, scale: .86 },
            { x: 58, y: -136, rotate: 5, scale: .84 },
            { x: 78, y: -78, rotate: 7, scale: .84 },
          ]
          const closed = {
            x: hovered ? index * (isMobile ? 11 : 22) : index * 5,
            y: hovered ? -40 - index * 4 : index * -5,
            rotate: hovered ? index * 2.4 : index * .8,
            scale: 1 - index * .018,
          }
          const opened = isMobile ? (mobileOpenPositions[index] || {
            x: offset * 28,
            y: -140 + Math.abs(offset) * 14,
            rotate: offset * 2,
            scale: .84,
          }) : {
            x: offset * 120,
            y: -152 + Math.abs(offset) * 12,
            rotate: offset * 1.5,
            scale: 1.08,
          }
          const openZIndex = isMobile ? 100 - index : 30 + index
          return <motion.article
            key={partner.id}
            className={`partner-file ${partner.logo ? 'real-partner' : 'placeholder-partner'}`}
            drag={isOpen && !reduceMotion ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 150 }}
            dragElastic={.18}
            dragSnapToOrigin
            onDragEnd={(_, info) => { if (info.offset.y > 85) setIsOpen(false) }}
            animate={isOpen ? { ...opened, zIndex: openZIndex } : { ...closed, zIndex: 100 - index }}
            whileHover={isOpen && !reduceMotion ? { y: opened.y - 12, zIndex: 100 } : undefined}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="partner-file-head"><span>PARTNER / 0{index + 1}</span><i>{partner.status}</i></div>
            <div className="partner-logo-area">{partner.logo ? <img src={partner.logo} alt={`${partner.name} logo`}/> : <div className="partner-monogram" aria-label={`${partner.name} placeholder logo`}>{partner.initials}</div>}</div>
            <div className="partner-file-foot"><b>{partner.name}</b><span>{partner.detail}</span></div>
          </motion.article>
        })}
      </div>

      <motion.button
        className="folder-front"
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Partner directory open' : 'Open MaisonMatch partner directory'}
        animate={{ opacity: isOpen ? 0 : 1, rotateX: hovered ? -18 : 0, y: hovered ? 8 : 0 }}
        transition={{ duration: reduceMotion ? 0 : .22 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={() => setIsOpen(true)}
      ><span className="folder-label"><FolderOpen size={15}/>{folderName}</span><small>Click to view companies actively using MaisonMatch</small></motion.button>

      {isOpen && <button className="folder-close" type="button" onClick={() => setIsOpen(false)}><X size={14}/> Close directory</button>}
      <motion.p className="folder-hint" animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 12 }}>Drag a company card down—or close the directory</motion.p>
    </div>
  </div>
}

export default InteractiveFolderGallery
