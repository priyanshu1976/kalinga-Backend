import axios from 'axios'

const API_BASE = 'http://localhost:3000/api'

async function runTests() {
  console.log('\n===== TESTING CIRCULARS =====')
  const circular = await axios.post(`${API_BASE}/circular`, {
    url: 'https://example.com/circular1.pdf',
    className: 'JUNIOR',
    subject: 'Maths',
  })
  console.log('Created Circular:', circular.data)

  const circulars = await axios.get(`${API_BASE}/circular/JUNIOR`)
  console.log('Fetched Circulars:', circulars.data)

  await axios.delete(
    `${API_BASE}/circular/${(circular.data as any).circular.id}`
  )
  console.log('Deleted Circular')

  console.log('\n===== TESTING TIMETABLE =====')
  const timetable = await axios.post(`${API_BASE}/timetable`, {
    url: 'https://example.com/timetable1.pdf',
    className: 'PRIMARY',
    section: 'A',
  })
  console.log('Created Timetable:', timetable.data)

  const timetables = await axios.get(`${API_BASE}/timetable/PRIMARY/A`)
  console.log('Fetched Timetables:', timetables.data)

  await axios.delete(
    `${API_BASE}/timetable/${(timetable.data as any).timetable.id}`
  )
  console.log('Deleted Timetable')

  console.log('\n===== TESTING HOMEWORK =====')
  const homework = await axios.post(`${API_BASE}/homework`, {
    className: 'SENIOR',
    section: 'B',
    subject: 'Science',
    teacher: 'Mr. Sharma',
  })
  console.log('Created Homework:', homework.data)

  const teacherHW = await axios.get(`${API_BASE}/homework/teacher/Mr. Sharma`)
  console.log('Fetched Homework by Teacher:', teacherHW.data)

  const studentHW = await axios.get(`${API_BASE}/homework/student/SENIOR/B`)
  console.log('Fetched Homework for Students:', studentHW.data)

  await axios.delete(
    `${API_BASE}/homework/${(homework.data as any).homework.id}`
  )
  console.log('Deleted Homework')

  console.log('\n===== ALL TESTS DONE SUCCESSFULLY =====')
}

runTests().catch((err) =>
  console.error('Test Failed:', err.response?.data || err.message)
)
