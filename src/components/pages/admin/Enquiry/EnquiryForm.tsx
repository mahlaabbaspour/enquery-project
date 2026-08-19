'use client'

import { useState } from 'react'

import dynamic from 'next/dynamic'

import { useRouter } from 'next/navigation'

import { MobileTimePicker } from '@mui/x-date-pickers'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { faIR } from '@mui/x-date-pickers/locales'

import { Button, Grid, Link } from '@mui/material'

import type { Dayjs } from 'dayjs'
import { format } from 'date-fns-jalali'

import CustomDatePicker from '@/components/elements/date_picker_text_filed'
import SwitchesBasic from '@/components/elements/SwitchBasic'

const LeafletMap = dynamic(() => import('@/components/pages/admin/Map/LeafletMap'), {
  ssr: false
})

type EnquiryFormProps = {
  mode?: 'create' | 'edit'
  initialDate?: Dayjs | null
  initialStatus?: number
  initialStartTime?: Dayjs | null
  initialEndTime?: Dayjs | null
  initialPolygon?: [number, number][]
  onSubmit?: (data: any) => void
  isPending?: boolean
  id?: number
  errors?: {
    request_date?: string[]
    start_time?: string[]
    end_time?: string[]
    polygon?: string[]
  }
}

export default function EnquiryForm({
  initialDate = null,
  initialStatus = 0,
  initialStartTime = null,
  initialEndTime = null,
  initialPolygon = [],
  onSubmit,
  isPending = false,
  id,
  errors = {}
}: EnquiryFormProps) {
  const [formData, setFormData] = useState(() => ({
    status: initialStatus
  }))

  const [pickDate, setPickDate] = useState<Date | null>(() => (initialDate ? initialDate.toDate() : null))

  const [startTime, setStartTime] = useState<Dayjs | null>(initialStartTime)

  const [endTime, setEndTime] = useState<Dayjs | null>(initialEndTime)

  const [polygon, setPolygon] = useState<[number, number][]>(() => initialPolygon)

  const router = useRouter()

  return (
    <Grid container spacing={6}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{
          ...faIR.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'ثبت',
          cancelButtonLabel: 'انصراف'
        }}
      >
        <Grid item md={4} xs={12}>
          <CustomDatePicker
            label='تاریخ'
            value={pickDate}
            onChange={date => setPickDate(date)}
            error={Boolean(errors.request_date)}
            helperText={errors.request_date?.[0]}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <MobileTimePicker
            label='ساعت شروع'
            value={startTime}
            onChange={value => setStartTime(value)}
            ampm={false}
            slotProps={{
              actionBar: {
                sx: {
                  '& .MuiButton-root:first-of-type': { color: 'error.main' },
                  '& .MuiButton-root:last-of-type': { color: 'success.main' }
                }
              },
              textField: {
                fullWidth: true,
                error: Boolean(errors.start_time),
                helperText: errors.start_time?.[0]
              }
            }}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <MobileTimePicker
            label='ساعت پایان'
            value={endTime}
            onChange={value => setEndTime(value)}
            ampm={false}
            slotProps={{
              actionBar: {
                sx: {
                  '& .MuiButton-root:first-of-type': { color: 'error.main' },
                  '& .MuiButton-root:last-of-type': { color: 'success.main' }
                }
              },
              textField: {
                fullWidth: true,
                error: Boolean(errors.end_time),
                helperText: errors.end_time?.[0]
              }
            }}
          />
        </Grid>
      </LocalizationProvider>

      <Grid item xs={12}>
        <LeafletMap polygon={polygon} onPolygonChange={setPolygon} />
      </Grid>

      <Grid item md={12}>
        <SwitchesBasic
          checked={formData.status === 1}
          onChange={(value: boolean) => setFormData({ ...formData, status: value ? 1 : 0 })}
        />
      </Grid>

      <Grid item md={12} display='flex' justifyContent='space-between'>
        <Link component='button' underline='hover' onClick={() => router.back()} color='error'>
          بازگشت
        </Link>

        <Button
          variant='contained'
          color='success'
          disabled={isPending}
          onClick={() => {
            const payload = {
              request_date: pickDate ? format(pickDate, 'yyyy/MM/dd') : null,
              start_time: startTime?.format('HH:mm'),
              end_time: endTime?.format('HH:mm'),
              status: formData.status,
              polygon: polygon.map(point => ({
                lat: point[0],
                lng: point[1]
              }))
            }

            console.log(payload)

            if (id) {
              onSubmit?.({
                id,
                payload
              })
            } else {
              onSubmit?.(payload)
            }
          }}
        >
          {isPending ? 'در حال ثبت...' : 'ثبت'}
        </Button>
      </Grid>
    </Grid>
  )
}
