// import { useEffect, useRef } from 'react'

// import { Box, CardContent, TextField } from '@mui/material'
// import { styled } from '@mui/material/styles'
// import { useForm, Controller } from 'react-hook-form'

// const OtpInput = styled(TextField)(() => ({
//   width: 50,
//   '& input': {
//     direction: 'ltr',
//     textAlign: 'center',
//     fontSize: 22,
//     padding: '12px 0'
//   }
// }))

// const defaultValues = {
//   val1: '',
//   val2: '',
//   val3: '',
//   val4: '',
//   val5: '',
//   val6: ''
// }

// export default function OTPForm({ onChange, value }: any) {
//   const inputsRef = useRef<HTMLInputElement[]>([])

//   const { control, handleSubmit, setValue, getValues } = useForm({ defaultValues })

//   const focusInput = (index: number) => {
//     if (inputsRef.current[index]) {
//       inputsRef.current[index].focus()
//     }
//   }

//   useEffect(() => {
//     if (!value) return

//     value.split('').forEach((char: string, i: number) => {
//       setValue(`val${i + 1}` as any, char)
//     })
//   }, [value, setValue])

//   const handleChange = (val: string, index: number) => {
//     if (!/^[0-9]?$/.test(val)) return

//     setValue(`val${index + 1}` as any, val)

//     const otp = Array.from({ length: 6 }, (_, i) => getValues(`val${i + 1}` as any) || '').join('')

//     onChange?.(otp)

//     if (val && index < 5) {
//       focusInput(index + 1)
//     }
//   }

//   const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
//     if (e.key === 'Backspace') {
//       const current = getValues(`val${index + 1}` as any)

//       if (!current && index > 0) {
//         focusInput(index - 1)
//       }
//     }
//   }

//   const handlePaste = (e: React.ClipboardEvent) => {
//     const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)

//     paste.split('').forEach((char, i) => {
//       setValue(`val${i + 1}` as any, char)
//     })

//     onChange?.(paste)

//     focusInput(paste.length - 1)

//     e.preventDefault()
//   }

//   const onSubmit = (data: any) => {
//     const otp = Object.values(data).join('')

//     console.log('OTP:', otp)
//   }

//   return (
//     <CardContent>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Box display='flex' justifyContent='space-between' onPaste={handlePaste} sx={{ direction: 'ltr' }}>
//           {[...Array(6)].map((_, index) => (
//             <Controller
//               key={index}
//               name={`val${index + 1}` as any}
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <OtpInput
//                   {...field}
//                   inputRef={(el: any) => (inputsRef.current[index] = el)}
//                   inputProps={{
//                     maxLength: 1,
//                     inputMode: 'numeric',
//                     pattern: '[0-9]*'
//                   }}
//                   onChange={e => handleChange(e.target.value, index)}
//                   onKeyDown={e => handleKeyDown(e, index)}
//                 />
//               )}
//             />
//           ))}
//         </Box>
//       </form>
//     </CardContent>
//   )
// }
import { useRef } from 'react'

import { Box, CardContent, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'

const OtpInput = styled(TextField)(() => ({
  width: 50,
  direction: 'ltr',
  '& input': {
    textAlign: 'center',
    fontSize: 22,
    padding: '12px 0',
    direction: 'ltr'
  }
}))

const defaultValues = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

export default function OTPForm({ onChange }: any) {
  const inputsRef = useRef<HTMLInputElement[]>([])

  const { control, handleSubmit, setValue, getValues } = useForm({ defaultValues })

  const focusInput = (index: number) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].focus()
    }
  }

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return

    setValue(`val${index + 1}` as any, value)
    const values = getValues()
    const otp = Object.values(values).join('')

    onChange?.(otp)

    if (value && index < 5) {
      setTimeout(() => focusInput(index + 1), 0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      const current = getValues(`val${index + 1}` as any)

      if (!current && index > 0) {
        focusInput(index - 1)
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)

    paste.split('').forEach((char, i) => {
      setValue(`val${i + 1}` as any, char)
    })

    focusInput(paste.length)

    e.preventDefault()
  }

  const onSubmit = (data: any) => {
    const otp = Object.values(data).join('')

    console.log('OTP:', otp)
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='space-between' dir='ltr' onPaste={handlePaste}>
          {[...Array(6)].map((_, index) => (
            <Controller
              key={index}
              name={`val${index + 1}` as any}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <OtpInput
                  {...field}
                  inputRef={(el: any) => (inputsRef.current[index] = el)}
                  inputProps={{
                    maxLength: 1,
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  onChange={e => handleChange(e.target.value, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                />
              )}
            />
          ))}
        </Box>
      </form>
    </CardContent>
  )
}
