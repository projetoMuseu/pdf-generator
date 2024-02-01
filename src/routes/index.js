import { Router } from "express";
import puppeteer from "puppeteer";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Olá, DEV!");
});

router.get("/api", (req, res) => {
  return res.json({conteudo: "Vazio"});
});

router.post("/api/pdf", async (req, res) => {
  const { htmlContent } = req.body;
  
  if (!htmlContent) {
    return res.status(400).send("HTML content is required");
  }

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.setContent(htmlContent);

    await page.emulateMediaType('screen');

    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    res.contentType("application/pdf");
    
    return res.send(pdf);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export { router };
