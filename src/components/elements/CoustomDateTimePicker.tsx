'use client'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'

// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export default function CustomDateTimePicker({
  label,
  onChange,
  error = false,
  helperText,
  value,
  minDate,
  maxDate,
  readOnly,
  disabled
}: {
  label: string
  error?: boolean
  onChange: (balue: Date | null) => void
  value?: any
  minDate?: any
  maxDate?: any
  readOnly?: boolean
  helperText?: string
  disabled?: boolean
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DateTimePicker
        label={label}
        value={value ? new Date(value) : null}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        readOnly={readOnly}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            error: error,
            helperText: helperText
          }
        }}
      />
    </LocalizationProvider>
  )
}
