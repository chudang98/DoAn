const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Homepage', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });
  it('it should have logo text', async () => {
    await page.goto(`${BASE_URL}/account/center`, { waitUntil: 'networkidle2' });
    // await page.waitForSelector('#logo', {
    //   timeout: 5000,
    // });
    // const text = await page.evaluate(() => document.getElementsByTagName('h1')[0].innerText);
    // expect(text).toContain('Người có công');
  });
});
