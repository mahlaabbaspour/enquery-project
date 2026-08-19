import { format } from 'date-fns'
import jalaliMoment from 'jalali-moment'

export function dateConverter(date: any): string | null {
  // Check if the date is already in Jalali format
  const isJalali = /^1[3-9]\d{2}\/\d{1,2}\/\d{1,2}$/.test(date)

  if (isJalali) {
    // If the date is already in Jalali format, return it as is
    return date
  }

  // If the date is not in Jalali format, convert it
  const formattedGregorianDate = date ? format(new Date(date), 'yyyy/MM/dd') : null

  const formattedJalaliDate = formattedGregorianDate
    ? jalaliMoment(formattedGregorianDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
    : null

  return formattedJalaliDate
}

export function convertPersianToEnglishDigits(text: any) {
  if (text) {
    // Define a map object for mapping Persian and Arabic digits to English digits
    const mapping: any = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
      '٠': '0',
      '١': '1',
      '٢': '2',
      '٣': '3',
      '٤': '4',
      '٥': '5',
      '٦': '6',
      '٧': '7',
      '٨': '8',
      '٩': '9'
    }

    // Replace Persian and Arabic digits with English digits
    return text.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (match: any) => mapping[match])
  } else {
    return null
  }
}

export function convertJalaliToGregorian(jalaliDateString: string): string | null {
  if (!jalaliDateString) {
    return null
  }

  try {
    // تبدیل ارقام فارسی به انگلیسی (اگه لازم باشه)
    const englishDigits = convertPersianToEnglishDigits(jalaliDateString) || jalaliDateString

    // تبدیل تاریخ شمسی به میلادی با jalaliMoment
    const gregorianMoment = jalaliMoment(englishDigits, 'jYYYY/jMM/jDD')

    // بررسی معتبر بودن تاریخ
    if (!gregorianMoment.isValid()) {
      return null
    }

    // برگرداندن به فرمت استاندارد میلادی
    return gregorianMoment.format('YYYY-MM-DD')
  } catch (error) {
    console.error('Error converting Jalali to Gregorian:', error)

    return null
  }
}

export function dateTimeConverter(dateTime: any): string | null {
  if (!dateTime) {
    return null
  }

  // Parse the input date string
  const parsedDate = new Date(dateTime)

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return null // Return null for invalid input
  }

  // Convert the date to Jalali format
  const formattedJalaliDate = jalaliMoment(parsedDate).locale('fa').format('YYYY/MM/DD')

  // Extract the time part from the original date string
  const timePart = format(parsedDate, 'HH:mm')

  // Combine the Jalali date and time
  const formattedJalaliDateTime = `${formattedJalaliDate} ${timePart}`

  return formattedJalaliDateTime
}

export const parseTimeToDate = (time: string | undefined | null) => {
  if (!time) return null

  // ساعت و دقیقه را جدا می‌کنیم
  const [hour, minute] = time.split(':').map(Number)
  const date = new Date() // تاریخ امروز

  date.setHours(hour, minute, 0, 0) // ست کردن ساعت و دقیقه

  return date
}

export function formatGregorian(dateTime: string): string | null {
  if (!dateTime) return null

  const d = new Date(dateTime)

  if (isNaN(d.getTime())) return null

  const pad = (n: number) => n.toString().padStart(2, '0')

  const year = d.getFullYear()
  const month = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const hours = pad(d.getHours())
  const minutes = pad(d.getMinutes())
  const seconds = pad(d.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
