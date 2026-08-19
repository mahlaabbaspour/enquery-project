'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, Divider } from '@mui/material'

import EnquiryForm from '@/components/pages/admin/Enquiry/EnquiryForm'
import { useCreateEnquiry } from '@/hooks/admin/enquiry/useEnquiry'

export default function CreateEnquiry() {
  const { mutateAsync, isPending } = useCreateEnquiry()
  const router = useRouter()

  const [errors, setErrors] = useState({})

  return (
    <Card>
      <CardHeader
        title='ایجاد درخواست جدید'
        titleTypographyProps={{
          align: 'center',
          variant: 'h4'
        }}
      />

      <Divider />

      <CardContent>
        <EnquiryForm
          isPending={isPending}
          errors={errors}
          onSubmit={async data => {
            try {
              setErrors({})

              await mutateAsync(data)

              router.push('/admin/enquiry')
            } catch (error: any) {
              setErrors(error?.errors ?? error?.response?.data?.errors ?? {})
            }
          }}
        />
      </CardContent>
    </Card>
  )
}
