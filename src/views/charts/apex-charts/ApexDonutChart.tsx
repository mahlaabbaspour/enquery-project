// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const ApexDonutChart = ({ title, description, dataChart }: any) => {
  const theme = useTheme()

  const filteredEntries = Object.entries(dataChart || {}).filter(([_, v]: any) => v > 0)

  const labels = filteredEntries.map(([k]) => k)
  const series: any = filteredEntries.map(([_, v]) => v)

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: labels,
    colors: ['#fdd835', '#00d4bd', '#826bf8', '#40CDFA', '#ffa1a1'],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: { fontSize: '1.2rem' },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              label: 'کل',
              formatter: () => series.reduce((a: any, b: any) => a + b, 0).toString(),
              color: theme.palette.text.primary
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader title={title} subheader={description} />
      <CardContent>
        <ReactApexChart type='donut' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexDonutChart
