'use client'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { faIR } from '@mui/x-date-pickers/locales'
import { faIR as faIRDateFns } from 'date-fns-jalali/locale'

type Props = {
  label: string
  value: Date | null
  onChange: (value: Date | null) => void
  minDate?: Date
  maxDate?: Date
  readOnly?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  readOnly,
  disabled,
  error = false,
  helperText
}: Props) {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFnsJalali}
      adapterLocale={faIRDateFns}
      localeText={{
        ...faIR.components.MuiLocalizationProvider.defaultProps.localeText,
        okButtonLabel: 'ثبت',
        cancelButtonLabel: 'انصراف'
      }}
    >
      <DatePicker
        label={label}
        value={value}
        onChange={value => onChange(value)}
        minDate={minDate}
        maxDate={maxDate}
        readOnly={readOnly}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            error,
            helperText
          }
        }}
      />
    </LocalizationProvider>
  )
}
