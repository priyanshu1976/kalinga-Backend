const axios = require('axios')

const API_BASE = 'http://localhost:3000/api'

// Test data
const testData = {
  circular: {
    url: 'https://example.com/circular1.pdf',
    className: 'JUNIOR',
    subject: 'Maths',
  },
  timetable: {
    url: 'https://example.com/timetable1.pdf',
    className: 'PRIMARY',
    section: 'A',
  },
  homework: {
    className: 'SENIOR',
    section: 'B',
    subject: 'Science',
    teacher: 'Mr. Sharma',
  },
}

// Helper function to log test results
function logTest(testName, result, error = null) {
  console.log(`\n${'='.repeat(50)}`)
  console.log(`TEST: ${testName}`)
  console.log(`${'='.repeat(50)}`)

  if (error) {
    console.log('❌ FAILED:', error.message)
    if (error.response) {
      console.log('Status:', error.response.status)
      console.log('Response:', error.response.data)
    }
  } else {
    console.log('✅ PASSED')
    console.log('Response:', JSON.stringify(result, null, 2))
  }
}

// Helper function to delay execution
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function runAllTests() {
  console.log('\n🚀 STARTING COMPREHENSIVE API TESTS')
  console.log('=====================================')

  const testResults = {
    passed: 0,
    failed: 0,
    tests: [],
  }

  try {
    // Test 1: Health Check
    console.log('\n📋 Testing Health Check...')
    try {
      const healthCheck = await axios.get('http://localhost:3000/')
      logTest('Health Check', healthCheck.data)
      testResults.passed++
      testResults.tests.push({ name: 'Health Check', status: 'PASSED' })
    } catch (error) {
      logTest('Health Check', null, error)
      testResults.failed++
      testResults.tests.push({ name: 'Health Check', status: 'FAILED' })
    }

    // Test 2: Circulars API Tests
    console.log('\n📄 TESTING CIRCULARS API')
    console.log('========================')

    let createdCircularId = null

    // Create Circular
    try {
      const circular = await axios.post(
        `${API_BASE}/circular`,
        testData.circular
      )
      logTest('Create Circular', circular.data)
      createdCircularId = circular.data.circular.id
      testResults.passed++
      testResults.tests.push({ name: 'Create Circular', status: 'PASSED' })
    } catch (error) {
      logTest('Create Circular', null, error)
      testResults.failed++
      testResults.tests.push({ name: 'Create Circular', status: 'FAILED' })
    }

    // Get Circulars by Class
    try {
      const circulars = await axios.get(`${API_BASE}/circular/JUNIOR`)
      logTest('Get Circulars by Class', circulars.data)
      testResults.passed++
      testResults.tests.push({
        name: 'Get Circulars by Class',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Get Circulars by Class', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Get Circulars by Class',
        status: 'FAILED',
      })
    }

    // Test invalid class name
    try {
      const circulars = await axios.get(`${API_BASE}/circular/INVALID`)
      logTest('Get Circulars with Invalid Class', circulars.data)
      testResults.passed++
      testResults.tests.push({
        name: 'Get Circulars with Invalid Class',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Get Circulars with Invalid Class', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Get Circulars with Invalid Class',
        status: 'FAILED',
      })
    }

    // Test missing fields in create circular
    try {
      const circular = await axios.post(`${API_BASE}/circular`, {
        url: 'https://example.com/test.pdf',
        // Missing className and subject
      })
      logTest('Create Circular with Missing Fields', circular.data)
      testResults.failed++
      testResults.tests.push({
        name: 'Create Circular with Missing Fields',
        status: 'FAILED',
      })
    } catch (error) {
      if (error.response && error.response.status === 400) {
        logTest(
          'Create Circular with Missing Fields (Expected Error)',
          error.response.data
        )
        testResults.passed++
        testResults.tests.push({
          name: 'Create Circular with Missing Fields',
          status: 'PASSED',
        })
      } else {
        logTest('Create Circular with Missing Fields', null, error)
        testResults.failed++
        testResults.tests.push({
          name: 'Create Circular with Missing Fields',
          status: 'FAILED',
        })
      }
    }

    // Delete Circular
    if (createdCircularId) {
      try {
        await axios.delete(`${API_BASE}/circular/${createdCircularId}`)
        logTest('Delete Circular', { success: true, message: 'Deleted' })
        testResults.passed++
        testResults.tests.push({ name: 'Delete Circular', status: 'PASSED' })
      } catch (error) {
        logTest('Delete Circular', null, error)
        testResults.failed++
        testResults.tests.push({ name: 'Delete Circular', status: 'FAILED' })
      }
    }

    // Test 3: Timetable API Tests
    console.log('\n📅 TESTING TIMETABLE API')
    console.log('========================')

    let createdTimetableId = null

    // Create Timetable
    try {
      const timetable = await axios.post(
        `${API_BASE}/timetable`,
        testData.timetable
      )
      logTest('Create Timetable', timetable.data)
      createdTimetableId = timetable.data.timetable.id
      testResults.passed++
      testResults.tests.push({ name: 'Create Timetable', status: 'PASSED' })
    } catch (error) {
      logTest('Create Timetable', null, error)
      testResults.failed++
      testResults.tests.push({ name: 'Create Timetable', status: 'FAILED' })
    }

    // Get Timetable by Class and Section
    try {
      const timetables = await axios.get(`${API_BASE}/timetable/PRIMARY/A`)
      logTest('Get Timetable by Class and Section', timetables.data)
      testResults.passed++
      testResults.tests.push({
        name: 'Get Timetable by Class and Section',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Get Timetable by Class and Section', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Get Timetable by Class and Section',
        status: 'FAILED',
      })
    }

    // Test invalid timetable query
    try {
      const timetables = await axios.get(`${API_BASE}/timetable/INVALID/Z`)
      logTest('Get Timetable with Invalid Class/Section', timetables.data)
      testResults.passed++
      testResults.tests.push({
        name: 'Get Timetable with Invalid Class/Section',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Get Timetable with Invalid Class/Section', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Get Timetable with Invalid Class/Section',
        status: 'FAILED',
      })
    }

    // Test missing fields in create timetable
    try {
      const timetable = await axios.post(`${API_BASE}/timetable`, {
        url: 'https://example.com/test.pdf',
        // Missing className and section
      })
      logTest('Create Timetable with Missing Fields', timetable.data)
      testResults.failed++
      testResults.tests.push({
        name: 'Create Timetable with Missing Fields',
        status: 'FAILED',
      })
    } catch (error) {
      if (error.response && error.response.status === 400) {
        logTest(
          'Create Timetable with Missing Fields (Expected Error)',
          error.response.data
        )
        testResults.passed++
        testResults.tests.push({
          name: 'Create Timetable with Missing Fields',
          status: 'PASSED',
        })
      } else {
        logTest('Create Timetable with Missing Fields', null, error)
        testResults.failed++
        testResults.tests.push({
          name: 'Create Timetable with Missing Fields',
          status: 'FAILED',
        })
      }
    }

    // Delete Timetable
    if (createdTimetableId) {
      try {
        await axios.delete(`${API_BASE}/timetable/${createdTimetableId}`)
        logTest('Delete Timetable', { success: true, message: 'Deleted' })
        testResults.passed++
        testResults.tests.push({ name: 'Delete Timetable', status: 'PASSED' })
      } catch (error) {
        logTest('Delete Timetable', null, error)
        testResults.failed++
        testResults.tests.push({ name: 'Delete Timetable', status: 'FAILED' })
      }
    }

    // Test 4: Homework API Tests
    console.log('\n📚 TESTING HOMEWORK API')
    console.log('=======================')

    let createdHomeworkId = null

    // Create Homework
    try {
      const homework = await axios.post(
        `${API_BASE}/homework`,
        testData.homework
      )
      logTest('Create Homework', homework.data)
      createdHomeworkId = homework.data.homework.id
      testResults.passed++
      testResults.tests.push({ name: 'Create Homework', status: 'PASSED' })
    } catch (error) {
      logTest('Create Homework', null, error)
      testResults.failed++
      testResults.tests.push({ name: 'Create Homework', status: 'FAILED' })
    }

    // Get Homework by Teacher
    try {
      const teacherHW = await axios.get(
        `${API_BASE}/homework/teacher/Mr. Sharma`
      )
      logTest('Get Homework by Teacher', teacherHW.data)
      testResults.passed++
      testResults.tests.push({
        name: 'Get Homework by Teacher',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Get Homework by Teacher', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Get Homework by Teacher',
        status: 'FAILED',
      })
    }

    // Get Homework for Students
    try {
      const studentHW = await axios.get(`${API_BASE}/homework/student/SENIOR/B`)
      logTest('Get Homework for Students', studentHW.data)
      testResults.passed++
      testResults.tests.push({
        name: 'Get Homework for Students',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Get Homework for Students', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Get Homework for Students',
        status: 'FAILED',
      })
    }

    // Test homework query with invalid teacher
    try {
      const teacherHW = await axios.get(
        `${API_BASE}/homework/teacher/NonExistentTeacher`
      )
      logTest('Get Homework by Non-existent Teacher', teacherHW.data)
      testResults.passed++
      testResults.tests.push({
        name: 'Get Homework by Non-existent Teacher',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Get Homework by Non-existent Teacher', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Get Homework by Non-existent Teacher',
        status: 'FAILED',
      })
    }

    // Test homework query with invalid class/section
    try {
      const studentHW = await axios.get(
        `${API_BASE}/homework/student/INVALID/Z`
      )
      logTest('Get Homework for Invalid Class/Section', studentHW.data)
      testResults.passed++
      testResults.tests.push({
        name: 'Get Homework for Invalid Class/Section',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Get Homework for Invalid Class/Section', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Get Homework for Invalid Class/Section',
        status: 'FAILED',
      })
    }

    // Test missing fields in create homework
    try {
      const homework = await axios.post(`${API_BASE}/homework`, {
        className: 'SENIOR',
        // Missing section, subject, and teacher
      })
      logTest('Create Homework with Missing Fields', homework.data)
      testResults.failed++
      testResults.tests.push({
        name: 'Create Homework with Missing Fields',
        status: 'FAILED',
      })
    } catch (error) {
      if (error.response && error.response.status === 400) {
        logTest(
          'Create Homework with Missing Fields (Expected Error)',
          error.response.data
        )
        testResults.passed++
        testResults.tests.push({
          name: 'Create Homework with Missing Fields',
          status: 'PASSED',
        })
      } else {
        logTest('Create Homework with Missing Fields', null, error)
        testResults.failed++
        testResults.tests.push({
          name: 'Create Homework with Missing Fields',
          status: 'FAILED',
        })
      }
    }

    // Delete Homework
    if (createdHomeworkId) {
      try {
        await axios.delete(`${API_BASE}/homework/${createdHomeworkId}`)
        logTest('Delete Homework', { success: true, message: 'Deleted' })
        testResults.passed++
        testResults.tests.push({ name: 'Delete Homework', status: 'PASSED' })
      } catch (error) {
        logTest('Delete Homework', null, error)
        testResults.failed++
        testResults.tests.push({ name: 'Delete Homework', status: 'FAILED' })
      }
    }

    // Test 5: Edge Cases and Error Handling
    console.log('\n🔍 TESTING EDGE CASES AND ERROR HANDLING')
    console.log('=========================================')

    // Test invalid HTTP methods
    try {
      await axios.put(`${API_BASE}/circular/1`, testData.circular)
      logTest(
        'PUT Method on Circular (Should Fail)',
        null,
        new Error('PUT method should not be allowed')
      )
      testResults.failed++
      testResults.tests.push({
        name: 'PUT Method on Circular',
        status: 'FAILED',
      })
    } catch (error) {
      if (error.response && error.response.status === 404) {
        logTest('PUT Method on Circular (Expected 404)', error.response.data)
        testResults.passed++
        testResults.tests.push({
          name: 'PUT Method on Circular',
          status: 'PASSED',
        })
      } else {
        logTest('PUT Method on Circular', null, error)
        testResults.failed++
        testResults.tests.push({
          name: 'PUT Method on Circular',
          status: 'FAILED',
        })
      }
    }

    // Test non-existent resource deletion
    try {
      await axios.delete(`${API_BASE}/circular/99999`)
      logTest(
        'Delete Non-existent Circular',
        null,
        new Error('Should not be able to delete non-existent resource')
      )
      testResults.failed++
      testResults.tests.push({
        name: 'Delete Non-existent Circular',
        status: 'FAILED',
      })
    } catch (error) {
      if (error.response && error.response.status === 500) {
        logTest(
          'Delete Non-existent Circular (Expected Error)',
          error.response.data
        )
        testResults.passed++
        testResults.tests.push({
          name: 'Delete Non-existent Circular',
          status: 'PASSED',
        })
      } else {
        logTest('Delete Non-existent Circular', null, error)
        testResults.failed++
        testResults.tests.push({
          name: 'Delete Non-existent Circular',
          status: 'FAILED',
        })
      }
    }

    // Test invalid ID format
    try {
      await axios.delete(`${API_BASE}/circular/invalid-id`)
      logTest(
        'Delete with Invalid ID Format',
        null,
        new Error('Should handle invalid ID format')
      )
      testResults.failed++
      testResults.tests.push({
        name: 'Delete with Invalid ID Format',
        status: 'FAILED',
      })
    } catch (error) {
      if (error.response && error.response.status === 500) {
        logTest(
          'Delete with Invalid ID Format (Expected Error)',
          error.response.data
        )
        testResults.passed++
        testResults.tests.push({
          name: 'Delete with Invalid ID Format',
          status: 'PASSED',
        })
      } else {
        logTest('Delete with Invalid ID Format', null, error)
        testResults.failed++
        testResults.tests.push({
          name: 'Delete with Invalid ID Format',
          status: 'FAILED',
        })
      }
    }

    // Test 6: Data Validation Tests
    console.log('\n✅ TESTING DATA VALIDATION')
    console.log('==========================')

    // Test all ClassType enum values
    const classTypes = ['JUNIOR', 'PRIMARY', 'SENIOR']
    for (const classType of classTypes) {
      try {
        const circular = await axios.post(`${API_BASE}/circular`, {
          url: `https://example.com/circular-${classType.toLowerCase()}.pdf`,
          className: classType,
          subject: 'Test Subject',
        })
        logTest(`Create Circular with ${classType} Class`, circular.data)

        // Clean up
        await axios.delete(`${API_BASE}/circular/${circular.data.circular.id}`)

        testResults.passed++
        testResults.tests.push({
          name: `Create Circular with ${classType} Class`,
          status: 'PASSED',
        })
      } catch (error) {
        logTest(`Create Circular with ${classType} Class`, null, error)
        testResults.failed++
        testResults.tests.push({
          name: `Create Circular with ${classType} Class`,
          status: 'FAILED',
        })
      }
    }

    // Test case sensitivity handling
    try {
      const circular = await axios.post(`${API_BASE}/circular`, {
        url: 'https://example.com/circular-case-test.pdf',
        className: 'junior', // lowercase
        subject: 'Case Test',
      })
      logTest('Create Circular with Lowercase Class Name', circular.data)

      // Clean up
      await axios.delete(`${API_BASE}/circular/${circular.data.circular.id}`)

      testResults.passed++
      testResults.tests.push({
        name: 'Create Circular with Lowercase Class Name',
        status: 'PASSED',
      })
    } catch (error) {
      logTest('Create Circular with Lowercase Class Name', null, error)
      testResults.failed++
      testResults.tests.push({
        name: 'Create Circular with Lowercase Class Name',
        status: 'FAILED',
      })
    }
  } catch (error) {
    console.error('\n💥 CRITICAL ERROR:', error.message)
    testResults.failed++
    testResults.tests.push({ name: 'Critical Error', status: 'FAILED' })
  }

  // Final Results Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 FINAL TEST RESULTS SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Tests Passed: ${testResults.passed}`)
  console.log(`❌ Tests Failed: ${testResults.failed}`)
  console.log(
    `📈 Success Rate: ${(
      (testResults.passed / (testResults.passed + testResults.failed)) *
      100
    ).toFixed(2)}%`
  )

  console.log('\n📋 Detailed Test Results:')
  testResults.tests.forEach((test) => {
    const status = test.status === 'PASSED' ? '✅' : '❌'
    console.log(`  ${status} ${test.name}`)
  })

  if (testResults.failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! API is working correctly.')
  } else {
    console.log(
      `\n⚠️  ${testResults.failed} test(s) failed. Please review the errors above.`
    )
  }

  console.log('\n🏁 Test execution completed.')
}

// Run the tests
runAllTests().catch((err) => {
  console.error('\n💥 Test execution failed:', err.message)
  process.exit(1)
})
