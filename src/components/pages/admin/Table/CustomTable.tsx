'use client'

import { useEffect, useRef, useState } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  Box,
  TextField,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  Pagination,
  Modal,
  Fade,
  CircularProgress,
  InputAdornment,
  Popover,
  Chip
} from '@mui/material'

import { RiCloseCircleFill } from 'react-icons/ri'
import { IoTrashOutline } from 'react-icons/io5'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt, BiTrash } from 'react-icons/bi'
import { FiAlertCircle, FiFilter, FiSearch } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import axios from 'axios'

import { api } from '@/libs/api'

import tableStyles from '@core/styles/table.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  borderRadius: 2
}

type ChecklistOption = {
  id: string | number
  name: string
}

function CustomTable({
  showBulkDelete = true,
  cacheTime = 5 * 60 * 1000,
  btnShow,
  textBtn,
  onClickBtn,
  isPending,
  routeNameCustom,
  checkboxEnabled,
  dataStruct,
  customOperation,

  queryKey,
  baseUrl,
  previousData,
  deleteModal = {
    title: null,
    text: null
  },
  titleTable = {
    title: null,
    description: null
  },
  cardHeader = {
    status: true,
    btn: null,
    placeholderSearch: null
  },
  btnOperation = {
    status: () => true,
    delete: () => true,
    edit: () => true,
    show: () => true,
    info: () => false,

    onShow: (row: any) => {},
    onEdit: (row: any) => {},
    onInfo: (row: any) => {}
  }
}: any) {
  const routeName = usePathname()

  const queryClient = useQueryClient()

  const [deleteFildId, setDeleteFildId] = useState('')
  const [openModal, setOpenModal] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')

  const [datas, setDatas] = useState<any[]>([])

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [sortColumn, setSortColumn] = useState<string>('')
  const [selectRows, setSelectRows] = useState<any>([])

  const [openFilter, setOpenFilter] = useState<any[]>(
    () =>
      dataStruct?.name?.map((item: any, i: number) => {
        const isChecklist = dataStruct?.filterType?.[i] === 'checklist'

        const paramName = dataStruct?.filterName?.[i] ?? (Array.isArray(item) ? item[0] : item)

        return {
          name: paramName,
          status: false,
          value: isChecklist ? [] : '',
          search: ''
        }
      }) ?? []
  )

  const [checklistAnchor, setChecklistAnchor] = useState<{ index: number; el: HTMLElement } | null>(null)
  const anchorRefs = useRef<Record<number, HTMLElement | null>>({})

  const [debouncedFilters, setDebouncedFilters] = useState<any[]>(openFilter)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(openFilter)
      setPageIndex(0)
    }, 500)

    return () => clearTimeout(timer)
  }, [openFilter])

  const buildFilterQuery = (filters: any[]) =>
    (filters || [])
      .filter((f: any) => {
        if (!f?.status) return false

        if (Array.isArray(f?.value)) return f.value.length > 0

        return Boolean(f?.value)
      })
      .map((f: any) => {
        if (Array.isArray(f.value)) {
          return f.value.map((v: any) => `&${encodeURIComponent(f.name)}[]=${encodeURIComponent(v)}`).join('')
        }

        return `&${encodeURIComponent(f.name)}=${encodeURIComponent(f.value)}`
      })
      .join('')

  const { data, isLoading, error } = useQuery({
    queryKey: [
      queryKey,
      { baseUrl, pageIndex, pageSize, filter, sortColumn, sortDirection, filters: debouncedFilters }
    ],

    queryFn: async () => {
      const start = performance.now()

      try {
        const filterQuery = buildFilterQuery(debouncedFilters)

        const url = `${baseUrl}?page=${pageIndex + 1}&first=${pageSize}&search=${filter}&sort_by=${sortColumn}&sort_order=${sortDirection}${filterQuery}`

        const res = await api.get(url)

        return res.data
      } catch (error: any) {
        throw error
      }
    },

    staleTime: cacheTime,
    enabled: Boolean(baseUrl)
  })

  const deleteFeild = async (id: string) => {
    setLoading(true)

    try {
      if (!baseUrl) {
        setDatas((prev: any) => prev.filter((row: any) => getNestedValue(row, dataStruct.rowId)[0] !== id))

        toast.success('عملیات با موفقیت انجام شد')
        setOpenModal('')

        return
      }

      const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${baseUrl}/destroy/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
        setDatas((data: any) => data.filter((row: any) => getNestedValue(row, dataStruct.rowId)[0] !== id))
        toast.success('عملیات با موفقیت انجام شد.')
        setOpenModal('')
      }
    } catch (error) {
      toast.error('خطایی رخ داده است')
    } finally {
      setLoading(false)
    }
  }

  const deleteBulkFeilds = async (ids: string[]) => {
    setLoading(true)

    try {
      if (!ids || ids.length === 0) {
        setLoading(false)

        return
      }

      if (!baseUrl) {
        setDatas((prev: any) => prev.filter((row: any) => !ids.includes(getNestedValue(row, dataStruct.rowId)[0])))

        toast.success('عملیات با موفقیت انجام شد')
        setOpenModal('')
        setSelectRows([])
        setLoading(false)

        return
      }

      const results = await Promise.all(
        ids.map(id =>
          fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${baseUrl}/destroy/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          })
        )
      )

      const allOk = results.every(result => result.ok)

      queryClient.invalidateQueries({ queryKey: [queryKey] })
      setDatas((data: any) => data.filter((row: any) => !ids.includes(getNestedValue(row, dataStruct.rowId)[0])))
      setSelectRows([])
      setOpenModal('')

      if (allOk) {
        toast.success('عملیات با موفقیت انجام شد.')
      } else {
        toast.error('برخی موارد حذف نشدند')
      }
    } catch (error) {
      toast.error('خطایی رخ داده است')
    } finally {
      setLoading(false)
    }
  }

  const tableData = Array.isArray(previousData) ? previousData : Array.isArray(data?.data) ? data.data : []

  useEffect(() => {
    if (Array.isArray(previousData) && previousData.length > 0) {
      setDatas(previousData)
    } else if (Array.isArray(data?.data)) {
      setDatas(data?.data)
    } else {
      setDatas([])
    }
  }, [data, previousData])

  const totalDataCount = previousData && previousData.length > 0 ? previousData.length : (data?.meta?.total ?? 0)

  function getNestedValue(obj: any, paths: any) {
    if (!Array.isArray(paths)) return []

    return paths.map(path => path.split('.').reduce((acc: any, key: any) => acc?.[key], obj))
  }

  const handleSelectedAll = (checked: boolean) => {
    setSelectRows(checked ? datas.map((r: any) => getNestedValue(r, dataStruct.rowId)).map(([e]: any) => e) : [])
  }

  const handleSelectRow = (id: any, checked: boolean) => {
    setSelectRows((prev: any) => (checked ? [...prev, id] : prev.filter((item: any) => item != id)))
  }

  const paginatedData = Array.isArray(datas)
    ? previousData?.length > 0
      ? datas.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
      : datas
    : []

  const isChecklistColumn = (i: number) => dataStruct?.filterType?.[i] === 'checklist'

  const openColumnFilter = (i: number, e?: React.MouseEvent<HTMLElement>) => {
    if (isChecklistColumn(i) && e) {
      setChecklistAnchor({ index: i, el: e.currentTarget })
    }

    setOpenFilter((prev: any) => {
      const next = [...prev]

      next[i] = { ...next[i], status: true }

      return next
    })
  }

  const closeColumnFilter = (i: number) => {
    setOpenFilter((prev: any) => {
      const next = [...prev]

      next[i] = isChecklistColumn(i)
        ? { ...next[i], status: next[i].value?.length > 0 }
        : { ...next[i], status: false, value: '' }

      return next
    })

    if (checklistAnchor?.index === i) setChecklistAnchor(null)
  }

  const changeColumnFilter = (i: number, value: string) => {
    setOpenFilter((prev: any) => {
      const next = [...prev]

      next[i] = { ...next[i], value }

      return next
    })
  }

  const changeChecklistSearch = (i: number, search: string) => {
    setOpenFilter((prev: any) => {
      const next = [...prev]

      next[i] = { ...next[i], search }

      return next
    })
  }

  const toggleChecklistValue = (i: number, id: string | number) => {
    setOpenFilter((prev: any) => {
      const next = [...prev]
      const current: any[] = Array.isArray(next[i].value) ? next[i].value : []

      const newValue = current.includes(id) ? current.filter((v: any) => v !== id) : [...current, id]

      next[i] = { ...next[i], value: newValue }

      return next
    })
  }

  const clearChecklistFilter = (i: number) => {
    setOpenFilter((prev: any) => {
      const next = [...prev]

      next[i] = { ...next[i], value: [], search: '' }

      return next
    })
  }

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal === 'delete'}
        onClose={() => setOpenModal('')}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={openModal === 'delete'} className='relative'>
          <Box sx={{ ...style }}>
            <div className='absolute  end-3 top-3'>
              <IconButton onClick={() => setOpenModal('')}>
                <AiOutlineClose />
              </IconButton>
            </div>
            <div className='w-full flex justify-center'>
              <IconButton color='error'>
                <FiAlertCircle className='size-[60px]' />
              </IconButton>
            </div>

            <Typography id='transition-modal-title' className='text-center' variant='h5' component='h5' sx={{ mt: 3 }}>
              حذف {deleteModal.title}
            </Typography>
            <Typography id='transition-modal-description' variant='subtitle1' className='text-center' sx={{ mt: 3 }}>
              آیا از حذف {deleteModal.text} مطمئن هستید؟
            </Typography>

            <div className='mt-8 flex w-full justify-end'>
              <div className='flex gap-3'>
                <Button onClick={() => setOpenModal('')} variant='contained'>
                  انصراف
                </Button>
                {loading ? (
                  <Button color='error' variant='contained'>
                    {' '}
                    <CircularProgress size={20} color='inherit' />
                  </Button>
                ) : (
                  <Button onClick={() => deleteFeild(deleteFildId)} color='error' variant='contained'>
                    بله
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal === 'allDelete'}
        onClose={() => setOpenModal('')}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={openModal === 'allDelete'} className='relative'>
          <Box sx={{ ...style }}>
            <div className='absolute  end-3 top-3'>
              <IconButton onClick={() => setOpenModal('')}>
                <AiOutlineClose />
              </IconButton>
            </div>
            <div className='w-full flex justify-center'>
              <IconButton color='error'>
                <FiAlertCircle className='size-[60px]' />
              </IconButton>
            </div>

            <Typography id='transition-modal-title' className='text-center' variant='h5' component='h5' sx={{ mt: 3 }}>
              حذف گروهی {deleteModal.text}
            </Typography>
            <Typography id='transition-modal-description' variant='subtitle1' className='text-center' sx={{ mt: 3 }}>
              آیا از حذف گروهی {deleteModal.text} مطمئن هستید؟
            </Typography>

            <div className='mt-8 flex w-full justify-end'>
              <div className='flex gap-3'>
                <Button onClick={() => setOpenModal('')} variant='contained'>
                  انصراف
                </Button>
                {loading ? (
                  <Button color='error' variant='contained'>
                    {' '}
                    <CircularProgress size={20} color='inherit' />
                  </Button>
                ) : (
                  <Button onClick={() => deleteBulkFeilds(selectRows)} color='error' variant='contained'>
                    بله
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Card>
        {titleTable.title && (
          <>
            <CardHeader
              sx={{ textAlign: 'center', mb: 5 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  {titleTable.title}{' '}
                </Typography>
              }
              subheader={titleTable.description && <Typography variant='caption'>{titleTable.description}</Typography>}
            />
            <Divider component='hr' sx={{ mb: 4 }} />
          </>
        )}
        {cardHeader.status && (
          <CardHeader
            sx={{ p: 5 }}
            title={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <Box>
                  {btnShow &&
                    (onClickBtn ? (
                      <Button variant='contained' onClick={onClickBtn}>
                        {textBtn}
                      </Button>
                    ) : (
                      <Button variant='contained' href={routeNameCustom || `${routeName}/create`}>
                        {textBtn}
                      </Button>
                    ))}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexDirection: 'row',
                    direction: 'ltr'
                  }}
                >
                  <TextField
                    size='small'
                    placeholder='جستجو...'
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    sx={{ width: 260 }}
                    InputProps={{
                      startAdornment:
                        selectRows.length > 0 && btnOperation.delete('allDelete') ? (
                          <InputAdornment position='start'>
                            <Tooltip title='حذف گروهی'>
                              <IconButton color='error' size='small' onClick={() => setOpenModal('allDelete')}>
                                <BiTrash />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ) : undefined
                    }}
                  />
                </Box>
              </Box>
            }
          />
        )}

        <div className='overflow-x-auto'>
          <Table stickyHeader className={tableStyles.table}>
            <TableHead>
              <TableRow>
                {checkboxEnabled && (
                  <TableCell
                    sx={{
                      width: '4%',
                      minWidth: '4%',
                      maxWidth: '4%'
                    }}
                  >
                    <Checkbox
                      indeterminate={selectRows.length > 0 && selectRows.length < datas.length}
                      checked={selectRows.length === datas.length && datas.length > 0}
                      onChange={(_, checked) => handleSelectedAll(checked)}
                    />
                  </TableCell>
                )}
                {dataStruct.title.map((item: any, i: number) =>
                  !dataStruct.filter[i] ? (
                    <TableCell
                      key={i}
                      sx={{
                        width: dataStruct.width?.[i],
                        textAlign: `${dataStruct.align?.[i]} !important`,
                        paddingLeft: `${openFilter[i]?.status ? '0px' : '20px'} !important`
                      }}
                      onContextMenu={e => {
                        e.preventDefault()

                        if (dataStruct.sort[i]) {
                          if (sortColumn === dataStruct.sort[i]) {
                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                          } else {
                            setSortColumn(dataStruct.sort[i])
                            setSortDirection('asc')
                          }
                        }
                      }}
                    >
                      <TableSortLabel
                        onClick={() => null}
                        active={sortColumn === dataStruct.sort[i]}
                        direction={sortDirection}
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          ...(dataStruct.sort[i] ? {} : { pointerEvents: 'none' })
                        }}
                      >
                        {item}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell
                      key={i}
                      sx={{
                        width: dataStruct.width?.[i],
                        textAlign: `${dataStruct.align?.[i]} !important`,
                        position: 'relative',
                        padding: '0px !important',
                        paddingLeft: `${openFilter[i]?.status && !isChecklistColumn(i) ? '0px' : '20px'} !important`
                      }}
                      onContextMenu={e => {
                        e.preventDefault()

                        if (dataStruct.sort[i]) {
                          if (sortColumn === dataStruct.sort[i]) {
                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                          } else {
                            setSortColumn(dataStruct.sort[i])
                            setSortDirection('asc')
                          }
                        }
                      }}
                    >
                      {isChecklistColumn(i) ? (
                        <Box
                          ref={(el: any) => (anchorRefs.current[i] = el)}
                          sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: dataStruct.align?.[i] || 'center',
                            gap: 0.5
                          }}
                        >
                          <TableSortLabel
                            onClick={() => null}
                            active={sortColumn === dataStruct.sort[i]}
                            direction={sortDirection}
                            sx={dataStruct.sort[i] ? {} : { pointerEvents: 'none' }}
                          >
                            {item}
                          </TableSortLabel>
                          <Tooltip title='فیلتر'>
                            <IconButton
                              size='small'
                              onClick={e => {
                                e.stopPropagation()
                                openColumnFilter(i, e)
                              }}
                              color={openFilter[i]?.value?.length > 0 ? 'primary' : 'default'}
                            >
                              <FiFilter size={14} />
                            </IconButton>
                          </Tooltip>
                          {openFilter[i]?.value?.length > 0 && (
                            <Chip
                              size='small'
                              label={openFilter[i].value.length}
                              color='primary'
                              sx={{ height: 18, fontSize: 11 }}
                            />
                          )}

                          <Popover
                            open={checklistAnchor?.index === i}
                            anchorEl={checklistAnchor?.el}
                            onClose={() => closeColumnFilter(i)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                          >
                            <Box sx={{ width: 260, p: 2 }} onClick={e => e.stopPropagation()}>
                              <TextField
                                autoFocus
                                fullWidth
                                size='small'
                                placeholder='جستجو...'
                                value={openFilter[i]?.search ?? ''}
                                onChange={e => changeChecklistSearch(i, e.target.value)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start'>
                                      <FiSearch size={14} />
                                    </InputAdornment>
                                  )
                                }}
                                sx={{ mb: 1 }}
                              />

                              <Box sx={{ maxHeight: 260, overflowY: 'auto' }}>
                                {(dataStruct.filterOptions?.[i] ?? [])
                                  .filter((opt: ChecklistOption) =>
                                    opt.name.toLowerCase().includes((openFilter[i]?.search ?? '').toLowerCase())
                                  )
                                  .map((opt: ChecklistOption) => (
                                    <FormControlLabel
                                      key={opt.id}
                                      sx={{
                                        width: '100%',
                                        '&.MuiFormControlLabel-root': {
                                          margin: 0
                                        }
                                      }}
                                      control={
                                        <Checkbox
                                          size='small'
                                          checked={(openFilter[i]?.value ?? []).includes(opt.id)}
                                          onChange={() => toggleChecklistValue(i, opt.id)}
                                        />
                                      }
                                      label={<Typography variant='body2'>{opt.name}</Typography>}
                                    />
                                  ))}

                                {(dataStruct.filterOptions?.[i] ?? []).filter((opt: ChecklistOption) =>
                                  opt.name.toLowerCase().includes((openFilter[i]?.search ?? '').toLowerCase())
                                ).length === 0 && (
                                  <Typography variant='body2' color='text.disabled' sx={{ textAlign: 'center', py: 2 }}>
                                    موردی یافت نشد
                                  </Typography>
                                )}
                              </Box>

                              <Divider sx={{ my: 1 }} />

                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button size='small' color='error' onClick={() => clearChecklistFilter(i)}>
                                  پاک کردن
                                </Button>
                                <Button size='small' variant='contained' onClick={() => closeColumnFilter(i)}>
                                  تایید
                                </Button>
                              </Box>
                            </Box>
                          </Popover>
                        </Box>
                      ) : !openFilter[i]?.status ? (
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: dataStruct.align?.[i] || 'center',
                            gap: 0.5
                          }}
                        >
                          <TableSortLabel
                            onClick={() => null}
                            active={sortColumn === dataStruct.sort[i]}
                            direction={sortDirection}
                            sx={dataStruct.sort[i] ? {} : { pointerEvents: 'none' }}
                          >
                            {item}
                          </TableSortLabel>
                          <Tooltip title='فیلتر'>
                            <IconButton
                              size='small'
                              onClick={e => {
                                e.stopPropagation()
                                openColumnFilter(i)
                              }}
                              color={openFilter[i]?.value ? 'primary' : 'default'}
                            >
                              <FiFilter size={14} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <div
                          className={`absolute w-full flex justify-${dataStruct.align?.[i]} fade-in -translate-y-1/2`}
                        >
                          <TextField
                            autoFocus
                            color='secondary'
                            size='small'
                            variant='outlined'
                            placeholder='جستجو...'
                            value={openFilter[i]?.value ?? ''}
                            sx={{
                              textAlign: `${dataStruct.align?.[i]} !important`,
                              mx: 1
                            }}
                            onChange={(e: any) => changeColumnFilter(i, e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <IconButton
                                  onClick={e => {
                                    e.stopPropagation()
                                    closeColumnFilter(i)
                                  }}
                                  sx={{ p: 0, mr: '-10px' }}
                                  color='default'
                                >
                                  <RiCloseCircleFill />
                                </IconButton>
                              )
                            }}
                          />
                        </div>
                      )}
                    </TableCell>
                  )
                )}
                {btnOperation?.status(true) && (
                  <TableCell
                    sx={{
                      width: '12%',
                      minWidth: '12%',
                      maxWidth: '12%',
                      textAlign: `${dataStruct.align?.[dataStruct.align.length - 1]} !important`
                    }}
                  >
                    عملیات
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            {isLoading || isPending ? (
              <TableBody>
                {new Array(6).fill(0).map((_: any, i: any) => (
                  <TableRow key={i}>
                    {checkboxEnabled && (
                      <TableCell key={i}>
                        <Box sx={{ width: 18, display: 'flex', justifyContent: dataStruct.align?.[i] }}>
                          <Skeleton animation='wave' height={30} sx={{ width: '100%' }} />
                        </Box>
                      </TableCell>
                    )}
                    {dataStruct.title.map((_: any, i: any) => (
                      <TableCell key={i}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: dataStruct.align?.[i] }}>
                          <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                        </Box>
                      </TableCell>
                    ))}
                    {btnOperation?.status(true) && (
                      <TableCell>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: `${dataStruct.align?.[dataStruct.align.length - 1]} !important`
                          }}
                        >
                          <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            ) : paginatedData?.length === 0 ? (
              <TableBody>
                <TableRow sx={{ height: '75px !important' }}>
                  <TableCell colSpan={dataStruct.title.length + 2} className='text-center'>
                    هیچ داده ای در دسترس نیست
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {paginatedData?.map((row: any, i: any) => {
                  const id = getNestedValue(row, dataStruct.rowId)[0]

                  return (
                    <TableRow sx={{ height: 69 }} key={id}>
                      {checkboxEnabled && (
                        <TableCell>
                          <Checkbox
                            checked={selectRows.includes(id)}
                            onChange={(_, checked) => handleSelectRow(id, checked)}
                          />
                        </TableCell>
                      )}
                      {dataStruct?.name?.map((item: any, i: any) => {
                        const custom = dataStruct?.customCol?.[i]
                        const value = getNestedValue(row, item)[0]

                        return (
                          <TableCell
                            key={i}
                            sx={{
                              width: dataStruct.width?.[i],
                              textAlign: `${dataStruct.align[i]} !important`
                            }}
                          >
                            {custom
                              ? custom(value, i, row)
                              : typeof value === 'boolean'
                                ? value
                                  ? 'فعال'
                                  : 'غیرفعال'
                                : value}
                          </TableCell>
                        )
                      })}
                      {btnOperation?.status(row) && (
                        <TableCell sx={{ textAlign: `${dataStruct.align[dataStruct.align.length - 1]} !important` }}>
                          {customOperation?.map((btn: any, i: any) => {
                            if (!btn.if(row)) return null
                            const href = btn.path ? `${routeName}/${id}/${btn.path}` : undefined

                            return href ? (
                              <Tooltip title={btn.title} arrow key={i}>
                                <Link href={href} passHref>
                                  <IconButton color={btn.color} sx={btn?.sx} title={btn.title}>
                                    {btn.icon}
                                  </IconButton>
                                </Link>
                              </Tooltip>
                            ) : (
                              <Tooltip title={btn.title} arrow key={i}>
                                <IconButton color={btn.color} sx={btn?.sx} onClick={() => btn.onClick(row)}>
                                  {btn.icon}
                                </IconButton>
                              </Tooltip>
                            )
                          })}

                          {btnOperation?.show(row) && (
                            <Tooltip title={'نمایش'} arrow>
                              <IconButton
                                sx={{ scale: 1.03 }}
                                color='warning'
                                onClick={() => {
                                  btnOperation?.onShow?.(row)
                                }}
                              >
                                <BiShowAlt />
                              </IconButton>
                            </Tooltip>
                          )}

                          {btnOperation?.edit(row) && (
                            <Tooltip title={'ویرایش'} arrow>
                              <IconButton
                                sx={{ scale: 0.95 }}
                                color='primary'
                                onClick={() => {
                                  btnOperation?.onEdit?.(row)
                                }}
                              >
                                <HiOutlinePencilAlt />
                              </IconButton>
                            </Tooltip>
                          )}

                          {btnOperation?.delete(row) && (
                            <Tooltip title={'حذف'} arrow>
                              <IconButton
                                sx={{ scale: 0.9 }}
                                onClick={() => {
                                  setDeleteFildId(id)
                                  setOpenModal('delete')
                                }}
                                color='error'
                              >
                                <IoTrashOutline />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
        </div>

        <TablePagination
          component={() => (
            <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
              <Typography color='text.disabled'>
                {`نمایش ${pageIndex * pageSize} تا  ${Math.min((pageIndex + 1) * pageSize, totalDataCount)} از ${totalDataCount}`}
              </Typography>

              <div className='flex items-center'>
                <FormControl sx={{ minWidth: 65, marginRight: 3, height: 38 }} size='small'>
                  <Select
                    sx={{
                      height: 38,
                      color: 'GrayText',
                      '& .MuiSelect-icon': { color: 'GrayText' }
                    }}
                    IconComponent={props => <ArrowDropDownIcon {...props} />}
                    labelId='demo-select-small-label'
                    id='demo-select-small'
                    value={pageSize}
                    onChange={(e: any) => {
                      setPageSize(e.target.value)
                      setPageIndex(0)
                    }}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                  </Select>
                </FormControl>
                <Pagination
                  shape='rounded'
                  color='primary'
                  variant='tonal'
                  count={Math.ceil(totalDataCount / pageSize)}
                  page={pageIndex + 1}
                  onChange={(_, page) => {
                    setPageIndex(page - 1)
                  }}
                  showFirstButton
                  showLastButton
                />
              </div>
            </div>
          )}
          count={tableData.length ?? 0}
          rowsPerPage={5}
          page={pageIndex}
          onPageChange={(_, page) => {
            setPageIndex(page)
          }}
        />
      </Card>
    </>
  )
}

export default CustomTable
