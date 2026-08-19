'use client'

import { useParams, useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import dayjs from 'dayjs'

import jalaliday from 'jalaliday'

import EnquiryForm from '@/components/pages/admin/Enquiry/EnquiryForm'
import { useGetEnquiry, useUpdateEnquiry } from '@/hooks/admin/enquiry/useEnquiry'

dayjs.extend(jalaliday)

export default function EditEnquiry() {
  const params = useParams()
  const router = useRouter()

  const id = Number(params.id)

  const { data, isLoading } = useGetEnquiry(id)

  const { mutateAsync, isPending } = useUpdateEnquiry()

  if (isLoading) {
    return <div>در حال دریافت اطلاعات...</div>
  }

  const enquiry = data?.data

  if (!enquiry) {
    return <div>درخواستی پیدا نشد</div>
  }

  const polygon: [number, number][] = enquiry.polygon.map((item: any) => [Number(item.lat), Number(item.lng)])

  return (
    <Card>
      <CardHeader
        title='ویرایش درخواست'
        titleTypographyProps={{
          align: 'center',
          variant: 'h4'
        }}
      />

      <Divider sx={{ mb: 5, mt: 3 }} />

      <CardContent>
        <EnquiryForm
          mode='edit'
          initialDate={dayjs(enquiry.request_date, { jalali: true })}
          initialStartTime={dayjs(`2000-01-01T${enquiry.start_time}`)}
          initialEndTime={dayjs(`2000-01-01T${enquiry.end_time}`)}
          initialStatus={enquiry.status ? 1 : 0}
          initialPolygon={polygon}
          id={id}
          isPending={isPending}
          onSubmit={async data => {
            await mutateAsync(data)

            router.push('/admin/enquiry')
          }}
        />
      </CardContent>
    </Card>
  )
}
