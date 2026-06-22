import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const obj = await page.$('#objecao');
if (obj) {
  await obj.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2800); // deixa a animação completar
  await obj.screenshot({ path: 'shot-obj.png' });
  console.log('ok');
} else console.log('nao achou #objecao');
await browser.close();
