/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require('express');
const PdfService = require('../services/pdf.service');
const pdfService = new PdfService();

const generarPdf = async (req, res = response) => {
    try {
        const { htmlContent } = req.body;

        if (!htmlContent) {
            return res.status(400).json({
                ok: false,
                msg: 'Falta la propiedad htmlContent en el cuerpo de la solicitud.'
            });
        }

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