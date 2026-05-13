// // Para ejecutar este ejemplo, debes instalar:
// // npm install express puppeteer
// // Archivo principal del servidor Express (server.js)

// // Importamos los módulos necesarios
// const express = require('express');
// const puppeteer = require('puppeteer');
// // Usamos la versión con Promesas del módulo 'fs' para operaciones asíncronas
// const fs = require('fs').promises;
// const path = require('path'); // Módulo para trabajar con rutas de directorios

// const app = express();
// const port = 3000; // Puerto donde correrá el servidor

// // Middleware para parsear JSON en el cuerpo de la solicitud
// // El límite se aumenta ya que el contenido HTML puede ser extenso
// app.use(express.json({ limit: '5mb' }));

// // --- CONFIGURACIÓN DE LA CARPETA DE UPLOADS ---
// // Define la ruta absoluta de la carpeta 'uploads' dentro del directorio actual del servidor
// const UPLOADS_DIR = path.join(__dirname, 'uploads');

// // Opciones de configuración del PDF para Puppeteer
// const PDF_OPTIONS = {
//     // Formato de página estándar A4
//     format: 'A4',
//     // Imprimir fondos (colores e imágenes)
//     printBackground: true,
//     // Márgenes de la página
//     margin: {
//         top: '1.5cm',
//         right: '1cm',
//         bottom: '1.5cm',
//         left: '1cm'
//     },
//     // Habilitar la plantilla de encabezado y pie de página
//     displayHeaderFooter: true,
//     // Plantilla HTML para el encabezado (usa clases especiales de Puppeteer)
//     headerTemplate: `
//         <div style="font-size: 10px; width: 100%; border-bottom: 1px solid #ccc; padding: 5px 1cm; text-align: center;">
//             <span style="float: left;">Reporte Corporativo</span>
//             <span style="float: right;">Generado el: <span class="date"></span></span>
//         </div>
//     `,
//     // Plantilla HTML para el pie de página
//     footerTemplate: `
//         <div style="font-size: 9px; width: 100%; text-align: right; padding: 5px 1cm;">
//             Página <span class="pageNumber"></span> de <span class="totalPages"></span>
//         </div>
//     `
// };

// // -----------------------------------------------------------------
// // ENDPOINT DE LA API (POST) PARA GENERAR Y GUARDAR EL PDF
// // -----------------------------------------------------------------
// // Este es el equivalente a un Action Method en un Controller de .NET Core
// app.post('/generar-pdf', async (req, res) => {
//     // Extrae el contenido HTML del cuerpo de la solicitud
//     const { htmlContent } = req.body;

//     if (!htmlContent) {
//         return res.status(400).json({ error: 'Falta la propiedad htmlContent en el cuerpo de la solicitud.' });
//     }

//     let browser;
//     try {
//         // 1. Asegurar que la carpeta 'uploads' exista (equivalente a Directory.CreateDirectory en C#)
//         await fs.mkdir(UPLOADS_DIR, { recursive: true });
//         console.log(`Carpeta 'uploads' asegurada en: ${UPLOADS_DIR}`);

//         // 2. Lanzar Puppeteer (el navegador Chromium headless)
//         browser = await puppeteer.launch({
//             args: ['--no-sandbox', '--disable-setuid-sandbox']
//         });
//         const page = await browser.newPage();

//         // 3. Crear el HTML completo inyectando los estilos y el contenido
//         const fullHtml = `
//             <!DOCTYPE html>
//             <html lang="es">
//             <head>
//                 <meta charset="UTF-8">
//                 <title>Documento Generado</title>
//                 <style>
//                     body { font-family: 'Arial', sans-serif; margin: 0; }
//                     .container { padding: 1cm; }
//                     /* Clase para forzar un salto de página después de un elemento */
//                     .page-break { page-break-after: always; }

//                     /* Oculta los elementos dinámicos del header/footer en el cuerpo principal */
//                     .pageNumber, .totalPages, .date { visibility: hidden; }
//                 </style>
//             </head>
//             <body>
//                 <div class='container'>
//                     ${htmlContent}
//                     <div class='page-break'></div>
//                     <p>Contenido de ejemplo para la segunda página.</p>
//                 </div>
//             </body>
//             </html>`;

//         // Establecer el contenido de la página
//         await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

//         // 4. Generar el PDF. Esto retorna un Buffer binario
//         const pdfBuffer = await page.pdf(PDF_OPTIONS);

//         // 5. Generar un nombre de archivo único
//         const uniqueId = Math.random().toString(36).substring(2, 9);
//         const fileName = `informe-${Date.now()}-${uniqueId}.pdf`;
//         // Combina la ruta de la carpeta con el nombre del archivo (equivalente a Path.Combine en C#)
//         const filePath = path.join(UPLOADS_DIR, fileName);

//         // 6. Guardar el Buffer binario en el archivo (equivalente a File.WriteAllBytesAsync en C#)
//         await fs.writeFile(filePath, pdfBuffer);

//         console.log(`PDF guardado exitosamente en: ${filePath}`);

//         // 7. Retornar una respuesta JSON de éxito al cliente
//         res.status(200).json({
//             message: 'PDF generado y guardado exitosamente en la carpeta uploads del servidor.',
//             fileName: fileName,
//             serverPath: filePath
//         });

//     } catch (error) {
//         console.error('Error durante la generación o guardado del PDF:', error);
//         res.status(500).json({
//             error: 'Error interno del servidor al procesar el PDF.',
//             details: error.message
//         });
//     } finally {
//         // 8. Cerrar el navegador de Puppeteer para liberar recursos
//         if (browser) {
//             await browser.close();
//         }
//     }
// });

// // -----------------------------------------------------------------
// // INICIO DEL SERVICIO
// // -----------------------------------------------------------------
// app.listen(port, () => {
//     console.log(`Servicio Node.js/Express escuchando en http://localhost:${port}`);
//     console.log(`La carpeta de almacenamiento es: ${UPLOADS_DIR}`);
// });

const { response } = require('express');
const pdfService = require('../services/pdf.service'); // Ajusta el nombre y ruta de tu servicio

const generarPdf = async (req, res = response) => {
    try {
        const { htmlContent } = req.body;

        // Validación inicial
        if (!htmlContent) {
            return res.status(400).json({
                ok: false,
                msg: 'Falta la propiedad htmlContent en el cuerpo de la solicitud.'
            });
        }

        // Llamamos al servicio
        const resultadoPdf = await pdfService.generarYGuardarPdf(htmlContent);

        return res.status(200).json({
            ok: true,
            msg: 'PDF generado y guardado exitosamente en el servidor.',
            fileName: resultadoPdf.fileName,
            serverPath: resultadoPdf.serverPath
        });

    } catch (error) {
        console.error('Error durante la generación o guardado del PDF:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor al procesar el PDF.',
            detalles: error.message
        });
    }
};

module.exports = {
    generarPdf
};