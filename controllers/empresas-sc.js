/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const EmpresaSCService = require("../services/empresas-sc.service");
const service = new EmpresaSCService();

const getEmpresasSC = async (req, res = response) => {
  try {
    const empresasSC = await service.obtenerEmpresasSC();
    res.status(200).json({ ok: true, empresasSC });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getEmpresaSCById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const empresaSC = await service.obtenerEmpresaSCById(id);
    res.status(200).json({ ok: true, empresaSC });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createEmpresaSC = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const empresaSC = await service.crearEmpresaSC({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, empresaSC });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateEmpresaSC = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const empresaSC = await service.actualizarEmpresaSC(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, empresaSC });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteEmpresaSC = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.eliminarEmpresaSC(id);
    res.status(200).json({ ok: true, msg: "Empresa eliminada correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getEmpresasSC,
  getEmpresaSCById,
  createEmpresaSC,
  updateEmpresaSC,
  deleteEmpresaSC
};