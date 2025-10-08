import path from 'path'
import XLSX from 'xlsx'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function readFile() {
  try {
    const filePath = path.join(__dirname, 'student.xlsx')
    const workbook = XLSX.readFile(filePath)
    const sheets = workbook.SheetNames

    console.log(sheets)

    for (const sheetName of sheets) {
      // Get the worksheet
      const worksheet = workbook.Sheets[sheetName]

      // Define the range where actual data starts (row 4 based on your sheet)
      //@ts-ignore
      const range = XLSX.utils.decode_range(worksheet['!ref'])
      range.s.r = 3 // Start from row 4 (0-indexed, so 3 means row 4)

      // Update the worksheet range
      worksheet['!ref'] = XLSX.utils.encode_range(range)

      // Convert to JSON starting from row 4
      const data = XLSX.utils.sheet_to_json(worksheet)

      let className = ''
      let section = ''

      let match = sheetName.match(/^(\d+)\s*([A-Z])?$/i)
      if (!match) match = sheetName.match(/^([A-Z]+)\s*([A-Z])?$/i)

      if (match) {
        className = match[1].trim()
        section = match[2] ? match[2].trim() : ''
      } else {
        className = sheetName.trim()
        section = ''
      }

      console.log(
        `📘 Importing sheet: ${sheetName} => Class: ${className}, Section: ${section}`
      )

      for (const row of data) {
        const name =
          //@ts-ignore
          (row.name as string) || // lowercase 'name' based on your sheet
          //@ts-ignore
          (row.Name as string) ||
          //@ts-ignore
          (row.StudentName as string) ||
          //@ts-ignore
          (row["Student's Name"] as string) ||
          //@ts-ignore
          (row['STUDENT NAME'] as string)

        console.log('Processing:', name)

        if (!name) {
          console.log('Skipping row with no name:', row)
          continue // skip empty rows
        }

        await prisma.student.create({
          data: {
            name: name.trim(),
            class: className,
            section,
            attendence: 0,
          },
        })
      }
    }

    console.log({ message: '✅ All students imported successfully!' })
  } catch (error) {
    console.error('❌ Error importing students:', error)
    console.log({ error: 'Something went wrong' })
  } finally {
    await prisma.$disconnect()
  }
}

readFile()
