import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { getUrl } from "../../config/cyccomputer";

export const GetProducts = async (req: Request, res: Response) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = browser.newPage();

  const pages = [1, 2, 3];

  const results:object[] = []
  for (const p of pages) {
    const url = getUrl("getGraphicCards", p.toString());

    (await page).goto(url);

    const result = await (
      await page
    ).evaluate(() => {
      const items = document
        .querySelectorAll(".laberProductGrid.laberProducts")[0]
        .querySelectorAll(".laberProduct-container");

      const data: object[] = [];
      for (const item of items) {
        const urls = [];
        const images = item
          .querySelectorAll(".thumbnail.product-thumbnail")[0]
          .querySelectorAll("img");
        for (const img of images) {
          const url = img.getAttribute("src");
          urls.push(url);
        }
        const nameItem = item
          .querySelectorAll(".productName")[0]
          .querySelectorAll("a")[0].textContent;
        data.push({ nameItem, urls });
      }
      return data;
    });
    results.push(result)
  }
  return res.json({
    results
  })
};
