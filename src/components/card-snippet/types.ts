// ** React Imports

// ** ateMUI Imports
import type { ReactNode } from 'react'

import type { CardProps } from '@mui/material/Card'

export type CardSnippetProps = CardProps & {
  id?: string
  title: string
  children: ReactNode

  className?: string
}
