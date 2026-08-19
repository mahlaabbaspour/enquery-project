'use client'

import { useState } from 'react'

import dynamic from 'next/dynamic'

import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'

import { useGetVehiclesLocations } from '@/hooks/admin/enquiry/useGetVehiclesLocations'

const LeafletMap = dynamic(() => import('@/components/pages/admin/Map/LeafletMap'), {
  ssr: false
})

type EnquiryData = {
  request_date: string
  start_time: string
  end_time: string
  status: boolean
  polygon: {
    lat: string
    lng: string
  }[]
}

type CarInfoProps = {
  data: EnquiryData
}

export default function CarInfo({ data }: CarInfoProps) {
  const [polygon, setPolygon] = useState<[number, number][]>(
    data.polygon.map(item => [Number(item.lat), Number(item.lng)])
  )

  const { vehicles } = useGetVehiclesLocations(data.id)

  console.log('vehicles:', vehicles)

  return (
    <>
      <Card sx={{ mb: 5 }}>
        <CardContent>
          <Typography variant='h4'>اطلاعات درخواست</Typography>

          <Divider sx={{ mb: 5, mt: 5 }} />

          <Grid container spacing={5}>
            <Grid item md={12}>
              <Typography>تاریخ:</Typography>

              <Typography variant='h5'>{data.request_date}</Typography>
            </Grid>

            <Grid item md={6}>
              <Typography>ساعت شروع:</Typography>

              <Typography variant='h5'>{data.start_time}</Typography>
            </Grid>

            <Grid item md={6}>
              <Typography>ساعت پایان:</Typography>

              <Typography variant='h5'>{data.end_time}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <LeafletMap polygon={polygon} onPolygonChange={setPolygon} vehicles={vehicles} />
      </Card>
    </>
  )
}
