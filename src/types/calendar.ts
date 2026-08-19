export type CalendarEvent = {
  id: string
  title: string
  start: string | Date
  end?: string | Date
  allDay?: boolean
  extendedProps: {
    calendar: 'Personal' | 'Business' | 'ETC'
    bg_color: 'primary' | 'success' | 'warning' | 'error'
    description?: string
    location?: string
  }
}
