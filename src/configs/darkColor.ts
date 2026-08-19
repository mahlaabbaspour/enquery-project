import { lightColors } from './bgColor'

export const getBadgeColors = (key: string | number) => {
  const index = hashCode(key) % lightColors.length
  const bg = lightColors[index]
  const text = darkenColor(bg, 0.55)

  return { bg, text }
}

const hashCode = (str: string | number) => {
  const s = String(str)
  let hash = 0

  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash)
  }

  return Math.abs(hash)
}

export const darkenColor = (hex: string, amount = 0.4) => {
  const num = parseInt(hex.replace('#', ''), 16)

  let r = (num >> 16) & 255
  let g = (num >> 8) & 255
  let b = num & 255

  r = Math.max(0, Math.min(255, Math.floor(r - 255 * amount)))
  g = Math.max(0, Math.min(255, Math.floor(g - 255 * amount)))
  b = Math.max(0, Math.min(255, Math.floor(b - 255 * amount)))

  return `rgb(${r}, ${g}, ${b})`
}
