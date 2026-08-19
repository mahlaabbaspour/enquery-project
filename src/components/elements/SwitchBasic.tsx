import Switch from '@mui/material/Switch'
import { Box, FormHelperText, Typography } from '@mui/material'

type Props = {
  checked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  error?: boolean
  helperText?: string
}

const SwitchesBasic = ({ checked, onChange, disabled, error, helperText }: Props) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          mt: 5,
          ml: 5
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>وضعیت :</Typography>

        <Switch checked={checked} onChange={e => onChange(e.target.checked)} disabled={disabled} />

        <Typography sx={{ fontWeight: 600, minWidth: '55px' }}>{checked ? 'فعال' : 'غیرفعال'}</Typography>
      </Box>

      {error && (
        <FormHelperText error sx={{ ml: 5 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  )
}

export default SwitchesBasic
