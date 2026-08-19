import * as XLSX from 'xlsx'

const validateExcel = async (file: File) => {
  const data = await file.arrayBuffer()
  const workbook = XLSX.read(data)

  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 })

  const errors: { row: number; message: string[] }[] = []

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2

    const nationalCode = String(row[0] ?? '').trim()
    const firstName = String(row[1] ?? '').trim()
    const lastName = String(row[2] ?? '').trim()
    const mobile = String(row[3] ?? '').trim()

    const rowErrors: string[] = []

    if (!nationalCode || !firstName || !lastName || !mobile) {
      rowErrors.push('همه فیلدها باید پر باشند')
    }

    if (nationalCode && !/^\d{10}$/.test(nationalCode)) {
      rowErrors.push('کد ملی باید ۱۰ رقم باشد')
    }

    if (mobile && !/^\d{11}$/.test(mobile)) {
      rowErrors.push('شماره موبایل باید ۱۱ رقم باشد')
    }

    if (rowErrors.length > 0) {
      errors.push({
        row: rowNumber,
        message: rowErrors
      })
    }
  })

  return errors
}

export default validateExcel
