import { CalendarEvent } from '@/types/calendar'

export const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'جلسه حقوقی',
    start: '2025-01-05T10:00:00',
    end: '2025-01-05T11:00:00',
    extendedProps: {
      calendar: 'Business',
      bg_color: 'primary',
      description: 'بررسی قرارداد'
    }
  },
  {
    id: '2',
    title: 'مشاوره فردی',
    start: '2025-01-08',
    allDay: true,
    extendedProps: {
      calendar: 'Personal',
      bg_color: 'success'
    }
  }
]
