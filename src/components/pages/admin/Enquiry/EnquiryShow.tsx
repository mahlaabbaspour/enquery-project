'use client'

import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import { Card, CardContent, CardHeader, Divider, Grid, Link, TextField, Typography } from '@mui/material'

import { useGetEnquiry } from '@/hooks/admin/enquiry/useEnquiry'

const LeafletMap = dynamic(() => import('@/components/pages/admin/Map/LeafletMap'), {
  ssr: false
})

export default function ShowEnquiry() {
  const params = useParams()
  const router = useRouter()

  const id = Number(params.id)

  const { data, isLoading } = useGetEnquiry(id)

  if (isLoading) {
    return <div>در حال دریافت اطلاعات...</div>
  }

  const enquiry = data?.data

  if (!enquiry) {
    return <div>اطلاعاتی یافت نشد</div>
  }

  const polygon = enquiry.polygon.map((item: any) => [Number(item.lat), Number(item.lng)])

  return (
    <Card>
      <CardHeader
        title='مشاهده درخواست'
        titleTypographyProps={{
          align: 'center',
          variant: 'h4'
        }}
      />

      <Divider />

      <CardContent>
        <Grid container spacing={5}>
          <Grid item md={4} xs={12}>
            <TextField label='تاریخ' value={enquiry.request_date} fullWidth disabled />
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField label='ساعت شروع' value={enquiry.start_time} fullWidth disabled />
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField label='ساعت پایان' value={enquiry.end_time} fullWidth disabled />
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField label='وضعیت' value={enquiry.status ? 'فعال' : 'غیرفعال'} fullWidth disabled />
          </Grid>

          <Grid item xs={12}>
            <Typography mb={2}>محدوده انتخاب‌شده</Typography>

            <LeafletMap polygon={polygon} readonly />
          </Grid>
          <Grid item md={12}>
            <Link component='button' underline='hover' onClick={() => router.back()} color='error'>
              بازگشت
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
