const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Configuración de rutas
// Ajusta el '../..' dependiendo de qué tan profundo esté este archivo en tu proyecto
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'reportes');

// Opciones globales del PDF
const PDF_OPTIONS = {
  format: 'A4',
  printBackground: true,
  margin: {
    top: '1.5cm',
    right: '1cm',
    bottom: '1.5cm',
    left: '1cm'
  },
  displayHeaderFooter: true,
  headerTemplate: `
        <div style="font-size: 10px; width: 100%; border-bottom: 1px solid #ccc; padding: 5px 1cm; text-align: center;">
            <span style="float: left;">Reporte Corporativo</span>
            <span style="float: right;">Generado el: <span class="date"></span></span>
        </div>
    `,
  footerTemplate: `
        <div style="font-size: 9px; width: 100%; text-align: right; padding: 5px 1cm;">
            Página <span class="pageNumber"></span> de <span class="totalPages"></span>
        </div>
    `
};

const generarYGuardarPdf = async (htmlContent) => {
  let browser;

  try {
    // 1. Asegurar que la carpeta 'uploads/reportes' exista
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    console.log(`Carpeta de PDFs asegurada en: ${UPLOADS_DIR}`);

    // 2. Lanzar Puppeteer
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // 3. Crear el HTML completo inyectando los estilos
    const fullHtml = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Documento Generado</title>
                <style>
                    body { font-family: 'Arial', sans-serif; margin: 0; }
                    .container { padding: 1cm; }
                    .page-break { page-break-after: always; }
                    .pageNumber, .totalPages, .date { visibility: hidden; }
                </style>
            </head>
            <body>
                <div class='container'>
                    ${htmlContent}
                </div>
            </body>
            </html>`;

    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // 4. Generar el buffer binario del PDF
    const pdfBuffer = await page.pdf(PDF_OPTIONS);

    // 5. Generar nombre y ruta
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const fileName = `informe-${Date.now()}-${uniqueId}.pdf`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    // 6. Guardar en disco
    await fs.writeFile(filePath, pdfBuffer);
    console.log(`PDF guardado exitosamente en: ${filePath}`);

    // Retornamos los datos para que el controlador arme la respuesta
    return {
      fileName,
      serverPath: filePath
    };

  } finally {
    // El bloque finally asegura que el navegador se cierre SIEMPRE, 
    // incluso si hubo un error en la escritura o generación.
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = {
  generarYGuardarPdf
};