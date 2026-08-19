'use client'

import { useParams } from 'next/navigation'

import CarInfo from '@/components/pages/admin/Enquiry/CarInfo'
import { useGetEnquiry } from '@/hooks/admin/enquiry/useEnquiry'

export default function InfoPage() {
  const params = useParams()

  const { data, isLoading } = useGetEnquiry(Number(params.id))

  if (isLoading) return null

  return <CarInfo data={data.data} />
}
