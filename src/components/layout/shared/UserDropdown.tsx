'use client'

// React Imports
import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

import Image from 'next/image'

// MUI Imports
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import { Box } from '@mui/material'

import { useSettings } from '@/@core/hooks/useSettings'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { settings } = useSettings()

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleUserLogout = async () => {
    try {
      // await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL, redirect: false })
      router.replace('/auth/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Box
        ref={anchorRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer'
        }}
      >
        <Badge
          overlap='circular'
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Avatar alt={''} src={''} className='bs-[38px] is-[38px]' />
        </Badge>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography fontSize={11} fontWeight={600} lineHeight={1.2}>
            Admin
          </Typography>

          <Typography variant='caption' fontSize={10} color='text.secondary' lineHeight={1.2}>
            TEST
          </Typography>
        </Box>
      </Box>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        sx={{ width: 300, maxWidth: 300 }}
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div
                    className='flex items-center plb-2 pli-6 gap-2'
                    tabIndex={-1}
                    onClick={e => handleDropdownClose(e, '/admin/profile/user-profile')}
                  >
                    <Avatar alt={''} src={''} />
                    <div className='flex items-start flex-col ' style={{ maxWidth: '12rem' }}>
                      <Typography
                        className=' cursor-pointer '
                        sx={{ wordBreak: 'break-word' }}
                        fontSize={'.9rem'}
                        color='text.primary'
                      >
                        dfgdg
                      </Typography>
                      <Typography
                        className=' cursor-pointer '
                        sx={{ wordBreak: 'break-word' }}
                        fontSize={'.9rem'}
                        color='text.primary'
                      >
                        dfgdg
                      </Typography>
                    </div>
                  </div>
                  <Divider></Divider>
                  <div className=' px-[12px] py-[8px] '>
                    <Button
                      endIcon={<Image src={'/images/icons/menu/actionPlan.png'} width={24} height={24} alt='image' />}
                      href='/admin/cartable/dashboard'
                      fullWidth
                      color='inherit'
                      sx={{
                        textAlign: 'right',
                        direction: 'rtl',
                        justifyContent: 'flex-end',
                        fontSize: 14
                      }}
                    >
                      پنل مدیریت
                    </Button>
                    <Button
                      endIcon={
                        <Image src={'/images/icons/menu/serviceReceiver.png'} width={24} height={24} alt='image' />
                      }
                      href={`/user/cartable/dashboard`}
                      fullWidth
                      color='inherit'
                      sx={{
                        textAlign: 'right',
                        direction: 'rtl',
                        justifyContent: 'flex-end',
                        fontSize: 14
                      }}
                    >
                      پنل خدمت گیرنده
                    </Button>

                    <Button
                      endIcon={
                        <Image src={'/images/icons/menu/serviceReceiver.png'} width={24} height={24} alt='image' />
                      }
                      href={`/superUser/cartable/dashboard`}
                      fullWidth
                      color='inherit'
                      sx={{
                        textAlign: 'right',
                        direction: 'rtl',
                        justifyContent: 'flex-end',
                        fontSize: 14
                      }}
                    >
                      پنل مشاور
                    </Button>
                  </div>
                  <Divider></Divider>
                  <div className='flex mt-[8px] items-center plb-2 pli-3'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='tabler-logout' />}
                      onClick={handleUserLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      خروج
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
