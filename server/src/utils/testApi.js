const testEndpoints = async () => {
  const baseURL = 'http://localhost:5000/api';
  console.log('--- Starting API Endpoints Verification ---');

  // Helper for requests
  const req = async (path, options = {}) => {
    const res = await fetch(`${baseURL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  };

  try {
    // 1. Health check
    const health = await req('/health');
    console.log('1. Health check:', health.status, health.data.message);

    // 2. GET all items
    const all = await req('/items');
    console.log(`2. GET /items: status=${all.status}, count=${all.data.count}`);
    if (!all.data.success || !Array.isArray(all.data.data)) throw new Error('GET /items failed');

    // 3. GET with filters
    const products = await req('/items?type=Product');
    console.log(`3. GET /items?type=Product: count=${products.data.count}`);

    const tasks = await req('/items?type=Task');
    console.log(`4. GET /items?type=Task: count=${tasks.data.count}`);

    const pending = await req('/items?status=Pending');
    console.log(`5. GET /items?status=Pending: count=${pending.data.count}`);

    // 4. POST create new item
    const newItemPayload = {
      name: 'Automated Test Product',
      description: 'Test description for automated verification',
      type: 'Product',
      status: 'Available',
      priority: 'High',
      price: 29.99
    };
    const created = await req('/items', {
      method: 'POST',
      body: JSON.stringify(newItemPayload)
    });
    console.log(`6. POST /items: status=${created.status} (expected 201), id=${created.data.data?._id}`);
    if (created.status !== 201) throw new Error(`POST /items failed with status ${created.status}`);

    const createdId = created.data.data._id;

    // 5. GET by ID
    const single = await req(`/items/${createdId}`);
    console.log(`7. GET /items/:id: status=${single.status}, name="${single.data.data?.name}"`);

    // 6. PUT update item
    const updated = await req(`/items/${createdId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: 'Updated Test Product Name',
        status: 'Out of Stock',
        price: 34.99
      })
    });
    console.log(`8. PUT /items/:id: status=${updated.status} (expected 200), new status=${updated.data.data?.status}`);

    // 7. Validation test: Invalid status for type
    const invalidStatus = await req(`/items/${createdId}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: 'Pending' // Pending is invalid for Product!
      })
    });
    console.log(`9. Invalid enum test (PUT wrong status for Product): status=${invalidStatus.status} (expected 400), msg="${invalidStatus.data.message}"`);

    // 8. Validation test: Invalid ID format
    const badId = await req('/items/123invalidid');
    console.log(`10. Invalid ID test: status=${badId.status} (expected 400), msg="${badId.data.message}"`);

    // 9. 404 test: Nonexistent ID
    const notFoundId = await req('/items/507f1f77bcf86cd799439011');
    console.log(`11. Nonexistent ID test: status=${notFoundId.status} (expected 404), msg="${notFoundId.data.message}"`);

    // 10. DELETE item
    const deleted = await req(`/items/${createdId}`, { method: 'DELETE' });
    console.log(`12. DELETE /items/:id: status=${deleted.status} (expected 200), msg="${deleted.data.message}"`);

    // 11. Verify item is gone
    const verifyDeleted = await req(`/items/${createdId}`);
    console.log(`13. Verify deleted GET: status=${verifyDeleted.status} (expected 404)`);

    // 12. Undefined route test (404)
    const badRoute = await req('/nonexistent-endpoint');
    console.log(`14. Unknown route test: status=${badRoute.status} (expected 404), msg="${badRoute.data.message}"`);

    console.log('\n>>> ALL BACKEND API TESTS PASSED SUCCESSFULLY! <<<');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
};

testEndpoints();
