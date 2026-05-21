/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const PdfService = require("../services/pdf.service");
const service = new PdfService();

const generarReportePdf = async (req, res = response) => {
  try {
    const { html } = req.body; // El frontend envía el contenido HTML

    if (!html) {
      return res.status(400).json({ ok: false, msg: 'No se recibió contenido HTML' });
    }

    const respuesta = await service.generatePdf(html);

    res.status(200).json({
      ok: true,
      respuesta
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      ok: false,
      msg: error.msg || 'Error interno al procesar el reporte'
    });
  }
};

module.exports = {
  generarReportePdf
};