'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Icon } from '@iconify/react'

interface Props {
  direction: 'ltr' | 'rtl'
  title: string
  description: string
  subTitle: string
  color: string
  data: any
}

const RechartsBarChart = ({ direction, title, description, subTitle, color, data }: Props) => {
  console.log(subTitle, 'SUBtITLTEEE')
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='recharts-custom-tooltip'>
          <Typography>{label}</Typography>
          <Divider />

          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: payload[0].fill, mr: 2.5 } }}>
            <Icon icon='mdi:circle' fontSize='0.6rem' />
            <Typography variant='body2'>{`${subTitle} : ${payload[0].value}`}</Typography>
          </Box>
        </div>
      )
    }

    return null
  }

  const convertChartData = (chart: Record<string, number>) => {
    const monthsOrder = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند'
    ]

    return monthsOrder.map(month => ({
      name: month,
      value: chart?.[month] ?? 0
    }))
  }

  const chartData = convertChartData(data)

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
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: color } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>{subTitle}</Typography>
          </Box>
        </Box>

        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <BarChart height={350} data={chartData} barSize={15} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' reversed={direction === 'rtl'} />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey='value' fill={color} radius={[15, 15, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsBarChart
