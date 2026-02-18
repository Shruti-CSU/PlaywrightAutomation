const { test, expect } = require('@playwright/test');

const API_BASE = 'https://jsonplaceholder.typicode.com';

test.describe('UI and API tests', () => {
  test('page title - example.com', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
  });

  test('GET /posts/1', async ({ request }) => {
    const res = await request.get(`${API_BASE}/posts/1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ id: 1 });
    expect(typeof body.userId).toBe('number');
    expect(typeof body.title).toBe('string');
  });

  test('POST /posts', async ({ request }) => {
    const postData = { title: 'foo', body: 'bar', userId: 1 };
    const res = await request.post(`${API_BASE}/posts`, {
      data: JSON.stringify(postData),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toMatchObject(postData);
    expect(body.id).toBeDefined();
  });
});