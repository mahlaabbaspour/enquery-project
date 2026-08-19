import React from 'react'

import NextLink from 'next/link'

import type { Theme } from '@mui/material'
import { Grid, Typography, Breadcrumbs } from '@mui/material'

interface BreadCrumbType {
  items?: any[]
}

const Breadcrumb = ({ items }: BreadCrumbType) => (
  <Grid
    container
    direction='row'
    alignItems='center'
    sx={{
      borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
      mb: 7,
      ml: 2,
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Breadcrumbs
      separator={
        <Typography
          sx={{
            color: 'text.disabled',
            fontSize: '0.9rem'
          }}
        >
          {'>'}
        </Typography>
      }
      aria-label='breadcrumb'
    >
      {items?.map((item, index) => (
        <div key={item.title}>
          {item.to ? (
            <NextLink
              href={item.to}
              style={{
                textDecoration: 'none'
              }}
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  transition: 'all .2s ease',

                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                {item.title}
              </Typography>
            </NextLink>
          ) : (
            <Typography
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                px: 1.5,
                py: 0.4,
                borderRadius: 1,
                backgroundColor: theme => `${theme.palette.primary.main}12`
              }}
            >
              {item.title}
            </Typography>
          )}
        </div>
      ))}
    </Breadcrumbs>
  </Grid>
)

export default Breadcrumb
