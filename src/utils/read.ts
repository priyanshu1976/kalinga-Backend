// import path from 'path'
// import XLSX from 'xlsx'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// // Default details: one string per month, each string is a sequence of '0's for each day in the month
// const defaultDetails: string[] = [
//   '0'.repeat(31), // January
//   '0'.repeat(28), // February
//   '0'.repeat(31), // March
//   '0'.repeat(30), // April
//   '0'.repeat(31), // May
//   '0'.repeat(30), // June
//   '0'.repeat(31), // July
//   '0'.repeat(31), // August
//   '0'.repeat(30), // September
//   '0'.repeat(31), // October
//   '0'.repeat(30), // November
//   '0'.repeat(31), // December
// ]

// // Function to update all students in the database with default details if not already set
// async function addDefaultDetailsToAllStudents() {
//   const students = await prisma.student.findMany()
//   for (const student of students) {
//     // Only update if details is empty or not set
//     if (!student.details || student.details.length === 0) {
//       await prisma.student.update({
//         where: { id: student.id },
//         data: {
//           details: defaultDetails,
//         },
//       })
//     }
//   }
// }

// addDefaultDetailsToAllStudents()
//   .then(() => {
//     console.log('Default details added to all students (if missing).')
//   })
//   .catch((err) => {
//     console.error('Error updating students:', err)
//   })

// import path from 'path'
// import XLSX from 'xlsx'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function readFile() {
//   try {
//     const filePath = path.join(__dirname, 'student.xlsx')
//     const workbook = XLSX.readFile(filePath)
//     const sheets = workbook.SheetNames

//     console.log(sheets)

//     for (const sheetName of sheets) {
//       // Get the worksheet
//       const worksheet = workbook.Sheets[sheetName]

//       // Check if worksheet has data and range is defined
//       if (!worksheet['!ref']) {
//         console.log(`Skipping empty sheet: ${sheetName}`)
//         continue
//       }

//       // Define the range where actual data starts (row 4 based on your sheet)
//       const range = XLSX.utils.decode_range(worksheet['!ref'])
//       range.s.r = 3 // Start from row 4 (0-indexed, so 3 means row 4)

//       // Update the worksheet range
//       worksheet['!ref'] = XLSX.utils.encode_range(range)

//       // Convert to JSON starting from row 4
//       const data = XLSX.utils.sheet_to_json(worksheet)

//       let className = ''
//       let section = ''

//       let match = sheetName.match(/^(\d+)\s*([A-Z])?$/i)
//       if (!match) match = sheetName.match(/^([A-Z]+)\s*([A-Z])?$/i)

//       if (match) {
//         className = match[1].trim()
//         section = match[2] ? match[2].trim() : ''
//       } else {
//         className = sheetName.trim()
//         section = ''
//       }

//       console.log(
//         `📘 Importing sheet: ${sheetName} => Class: ${className}, Section: ${section}`
//       )

//       for (const row of data as any[]) {
//         const name =
//           row.name ||
//           row.Name ||
//           row.StudentName ||
//           row["Student's Name"] ||
//           row['STUDENT NAME']

//         console.log('Processing:', name)

//         if (!name) {
//           console.log('Skipping row with no name:', row)
//           continue // skip empty rows
//         }

//         await prisma.student.create({
//           data: {
//             name: name.toString().trim(),
//             class: className,
//             section,
//             attendence: 0,
//           },
//         })
//       }
//     }

//     console.log({ message: '✅ All students imported successfully!' })
//   } catch (error) {
//     console.error('❌ Error importing students:', error)
//     console.log({ error: 'Something went wrong' })
//   } finally {
//     await prisma.$disconnect()
//   }
// }

// readFile()
