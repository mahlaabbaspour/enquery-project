import * as XLSX from 'xlsx'

const parseExcelToArray = async (file: File) => {
  const data = await file.arrayBuffer()
  const workbook = XLSX.read(data)

  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 })

  // حذف هدر و تبدیل مستقیم به آرایه موردنظر
  const result = rows.slice(1).map(row => ({
    username: String(row[0] ?? '').trim(),
    first_name: String(row[1] ?? '').trim(),
    last_name: String(row[2] ?? '').trim(),
    mobile: String(row[3] ?? '').trim()
  }))

  return result
}

export default parseExcelToArray
