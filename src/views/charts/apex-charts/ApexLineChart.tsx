'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'

interface Props {
  title: string
  description: string
  color: string
  data: Record<string, number>
}

const WeeklySessionsChart = ({ title, description, color, data }: Props) => {
  const convertLast10Days = (data: Record<string, number>) => {
    const order = [
      '9روز پیش ',
      '8روز پیش ',
      '7روز پیش ',
      '6روز پیش ',
      '5روز پیش ',
      '4روز پیش ',
      '3روز پیش ',
      '2روز پیش ',
      '1روز پیش ',
      'امروز'
    ]

    return order.map(label => ({
      day: label.trim(),
      count: data?.[label] ?? 0
    }))
  }

  const chartData = convertLast10Days(data)
  console.log(chartData, 'chartData')

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        }
        subheader={<Typography variant='caption'>{description}</Typography>}
      />
      <CardContent>
        <div style={{ width: 350, height: 360 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis hide />
              <YAxis />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='count'
                stroke={color}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeeklySessionsChart
