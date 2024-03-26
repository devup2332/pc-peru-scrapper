import { sleep } from "bun";
import { Request, Response } from "express";
import puppeteer from "puppeteer";
export const GetProductsRipleyController = async (
  req: Request,
  res: Response
) => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  const results = [];
  for (const index of [1, 2, 3]) {
    await page.goto(
      `https://simple.ripley.com.pe/tecnologia/computacion/monitores?s=mdco&source=menu&page=${index}`
    );

    const result = await page.evaluate(() => {
      const containers = document.querySelectorAll(
        ".catalog-product-item.catalog-product-item__container.undefined"
      );

      const data: object[] = [];

      containers.forEach((c, index) => {
        const urls: string[] = [];
        const imgs = c.querySelectorAll("img");
        imgs.forEach((item) => {
          const url =
            (item as HTMLImageElement).dataset.src ||
            ((item as HTMLImageElement).src as string);
          const imageUrl = url.includes("https://") ? url : `https:${url}`;
          urls.push(imageUrl);
        });
        const name = (
          c.querySelectorAll(
            ".catalog-product-details__name"
          )[0] as HTMLDivElement
        ).innerHTML;
        const price = (
          c.querySelector(".catalog-prices__offer-price") as HTMLDataListElement
        ).innerHTML;
        data.push({
          urls,
          name,
          price,
        });
      });
      return data;
    });
    results.push(result);
    await sleep(3000);
  }
  await browser.close();

  return res.json({
    results,
  });
};
