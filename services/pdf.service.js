/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Puppeteer Service
*/
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const sequelize = require('../database/connection');

class PdfService {
  constructor() {
    this.uploadsDir = path.join(__dirname, '..', 'uploads', 'reportes');

    this.baseStyles = `
        body { font-family: 'Arial', sans-serif; margin: 0; color: #333; }
        .container { padding: 1cm; }
        .page-break { page-break-after: always; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #eee; padding: 8px; text-align: left; }
        th { background-color: #f9f9f9; font-weight: bold; }
        .text-center { text-align: center; }
    `;

    this.pdfOptions = {
      format: 'A4',
      printBackground: true,
      margin: { top: '1.5cm', right: '1cm', bottom: '1.5cm', left: '1cm' },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; border-bottom: 1px solid #ccc; padding: 5px 1cm; text-align: center; font-family: Arial; color: #666;">
            <span style="float: left;">Reporte Corporativo QPLUS</span>
            <span style="float: right;">Fecha: <span class="date"></span></span>
        </div>`,
      footerTemplate: `
        <div style="font-size: 9px; width: 100%; text-align: right; padding: 5px 1cm; font-family: Arial; color: #999;">
            Página <span class="pageNumber"></span> de <span class="totalPages"></span>
        </div>`
    };
  }

  async generatePdf(htmlContent) {
    let browser;

    return await sequelize.transaction(async (t) => {
      try {
        await fs.mkdir(this.uploadsDir, { recursive: true });

        browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        const fullHtml = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <style>${this.baseStyles}</style>
            </head>
            <body>
                <div class='container'>${htmlContent}</div>
            </body>
            </html>`;

        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf(this.pdfOptions);

        const fileName = `reporte-${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`;
        const filePath = path.join(this.uploadsDir, fileName);

        await fs.writeFile(filePath, pdfBuffer);

        return {
          success: true,
          fileName,
          generatedAt: new Date()
        };

      } catch (error) {
        console.error('Error en PdfService:', error);
        throw { statusCode: 500, msg: 'Error al generar el documento PDF' };
      } finally {
        if (browser) await browser.close();
      }
    });
  }
}

module.exports = PdfService;