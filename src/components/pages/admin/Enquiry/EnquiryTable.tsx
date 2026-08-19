'use client'

import { useRouter } from 'next/navigation'

import { Chip, IconButton, Tooltip } from '@mui/material'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import Breadcrumb from '@/components/Breakcrumb'
import CustomTable from '@/components/pages/admin/Table/CustomTable'

export default function EnquiryTable() {
  const router = useRouter()

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'درخواست ها' }]

  const dataStruct = {
    rowId: ['id'],

    title: ['تاریخ', 'ساعت شروع', 'ساعت پایان', 'وضعیت', 'اطلاعات خودرو'],

    name: [['request_date'], ['start_time'], ['end_time'], ['status'], ['id']],

    customCol: [
      null,
      null,
      null,
      (value: boolean) => <Chip label={value ? 'فعال' : 'غیر فعال'} color={value ? 'success' : 'error'} size='small' />,
      (_value: any, _index: number, row: any) => (
        <Tooltip title='مشاهده اطلاعات خودروها' arrow>
          <IconButton color='info' onClick={() => router.push(`/admin/enquiry/${row.id}/info`)}>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      )
    ],

    align: ['center', 'center', 'center', 'center', 'center'],

    width: ['20%', '20%', '20%', '20%', '20%'],

    sort: ['request_date', 'start_time', 'end_time', 'status', ''],

    filter: [true, true, true, true, false]
  }

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: ' فهرست درخواست ها',
          description: 'تمام درخواست های ثبت شده'
        }}
        checkboxEnabled={true}
        cardHeader={{
          status: true
        }}
        queryKey='enquiry'
        baseUrl='/request-area'
        textBtn='درخواست جدید'
        btnShow={true}
        dataStruct={dataStruct}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true,

          info: () => true,

          onShow: (row: any) => {
            router.push(`/admin/enquiry/${row.id}/show`)
          },

          onEdit: (row: any) => {
            router.push(`/admin/enquiry/${row.id}/edit`)
          },

          onInfo: (row: any) => {
            router.push(`/admin/enquiry/${row.id}/info`)
          }
        }}
      />
    </>
  )
}
