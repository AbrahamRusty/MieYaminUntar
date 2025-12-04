const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/admin';

// Test configuration
const testConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

console.log('🧪 Starting Admin API Tests...\n');

// Test functions
async function testEndpoint(name, method, url, data = null) {
  try {
    console.log(`Testing ${method} ${url} - ${name}`);

    const config = {
      ...testConfig,
      method,
      url
    };

    if (data && (method === 'post' || method === 'put')) {
      config.data = data;
    }

    const response = await axios(config);

    console.log(`✅ ${name}: SUCCESS (${response.status})`);
    if (response.data && response.data.success !== undefined) {
      console.log(`   Response: ${response.data.success ? 'SUCCESS' : 'FAILED'}`);
    }
    if (response.data && response.data.data) {
      console.log(`   Data count: ${Array.isArray(response.data.data) ? response.data.data.length : 'single object'}`);
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.log(`❌ ${name}: FAILED`);
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${error.response.data.error || error.response.data.message || 'Unknown error'}`);
    } else if (error.code === 'ECONNREFUSED') {
      console.log(`   Error: Server not running or connection refused`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
    return { success: false, error };
  }
}

async function runTests() {
  const results = {
    total: 0,
    passed: 0,
    failed: 0
  };

  // Test Users endpoints
  console.log('👥 Testing User Management Endpoints...\n');

  // GET /api/admin/users
  const usersResult = await testEndpoint('Get All Users', 'get', `${BASE_URL}/users`);
  results.total++; usersResult.success ? results.passed++ : results.failed++;

  // Test Menu endpoints
  console.log('\n🍽️  Testing Menu Management Endpoints...\n');

  // GET /api/admin/menus
  const menusResult = await testEndpoint('Get All Menus', 'get', `${BASE_URL}/menus`);
  results.total++; menusResult.success ? results.passed++ : results.failed++;

  // Test Orders endpoints
  console.log('\n📦 Testing Order Management Endpoints...\n');

  // GET /api/admin/orders
  const ordersResult = await testEndpoint('Get All Orders', 'get', `${BASE_URL}/orders`);
  results.total++; ordersResult.success ? results.passed++ : results.failed++;

  // Test with query parameters
  console.log('\n🔍 Testing Query Parameters...\n');

  // GET /api/admin/users with pagination
  const usersPagedResult = await testEndpoint('Get Users with Pagination', 'get', `${BASE_URL}/users?page=1&limit=5`);
  results.total++; usersPagedResult.success ? results.passed++ : results.failed++;

  // GET /api/admin/menus with category filter
  const menusFilteredResult = await testEndpoint('Get Menus with Category Filter', 'get', `${BASE_URL}/menus?category=mie`);
  results.total++; menusFilteredResult.success ? results.passed++ : results.failed++;

  // GET /api/admin/orders with status filter
  const ordersFilteredResult = await testEndpoint('Get Orders with Status Filter', 'get', `${BASE_URL}/orders?status=pending`);
  results.total++; ordersFilteredResult.success ? results.passed++ : results.failed++;

  // Test Dashboard Stats
  console.log('\n📊 Testing Dashboard Stats...\n');

  // GET /api/admin/stats
  const statsResult = await testEndpoint('Get Dashboard Stats', 'get', `${BASE_URL}/stats`);
  results.total++; statsResult.success ? results.passed++ : results.failed++;

  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log(`Total Tests: ${results.total}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);

  if (results.failed === 0) {
    console.log('\n🎉 All tests passed! Admin API is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the server logs and database connection.');
  }

  // Exit the process
  process.exit(results.failed === 0 ? 0 : 1);
}

// Handle server startup delay
setTimeout(() => {
  runTests().catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}, 2000); // Wait 2 seconds for server to start
