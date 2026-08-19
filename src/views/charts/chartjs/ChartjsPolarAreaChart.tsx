// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { PolarArea } from 'react-chartjs-2'
import { ChartData, ChartOptions, Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js'
import { Typography } from '@mui/material'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

interface PolarAreaProps {
  info: string
  grey: string
  green: string
  yellow: string
  primary: string
  warning: string
  legendColor: string
  title: string
  description: string
  dataChart: any
}

const ChartjsPolarAreaChart = (props: PolarAreaProps) => {
  const { info, grey, green, yellow, primary, warning, legendColor, title, description, dataChart } = props

  const convertDynamicData = (data: Record<string, number>) => {
    const filteredEntries = Object.entries(data).filter(([_, value]) => value > 0)

    const labels = filteredEntries.map(([key]) => key)
    const values = filteredEntries.map(([_, value]) => value)

    return { labels, values }
  }

  const buildColors = (count: number) => {
    const palette = [primary, info, warning, yellow, green, grey]
    return Array.from({ length: count }, (_, i) => palette[i % palette.length])
  }

  const dynamic = convertDynamicData(dataChart)

  const chartData: ChartData<'polarArea'> = {
    labels: dynamic.labels,
    datasets: [
      {
        borderWidth: 0,
        data: dynamic.values,
        backgroundColor: buildColors(dynamic.labels.length)
      }
    ]
  }

  const options: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        maxWidth: 100,
        labels: {
          padding: 15,
          boxWidth: 9,
          color: legendColor,
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        sx={{ textAlign: 'center', pb: 0 }}
        title={
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        }
        subheader={<Typography variant='caption'>{description}</Typography>}
      />
      <CardContent>
        <PolarArea data={chartData} height={300} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsPolarAreaChart
