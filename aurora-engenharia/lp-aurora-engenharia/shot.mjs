import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const met = await page.$("#metodo");
const mbox = await met.boundingBox();
// fim da seção (onde aparece o fecho texto+CTA)
const ends = [mbox.height - 760, mbox.height - 500, mbox.height - 250];
for (let i = 0; i < ends.length; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), mbox.y + ends[i]);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `shots/fecho-${i}.png` });
}

await browser.close();
console.log("ok");
