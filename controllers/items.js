// /*
//     Author: German Valencia
//     Actualizado: German Valiencia 20251026
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTKValoresUnitarios = require('../models/valor-unitario')(sequelize);
// const { io } = require('../index');

// const getItems = async (req, res) => {
//   try {
//     const Items = await PTKValoresUnitarios.findAll();
//     return res.status(201).json({
//       ok: true,
//       Items: Items,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener Items' });
//   }
// };

// const getValoresUnitariosById = async (req, res) => {
//   try {
//     const codigoItem = req.params.id;
//     const item = await PTKValoresUnitarios.findOne({
//       where: { codigoItem },
//     });
//     if (!item) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un item por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       item: item,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener item' });
//   }
// };

// const createValorUnitario = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const nuevo = await PTKValoresUnitarios.create(newRegistro);
//     io.emit("Items--actualizados", {
//       action: "create",
//       msg: `item creado: ${nuevo.nombreValor}`,
//     });
//     return res.status(201).json({
//       ok: true,
//       item: nuevo,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al crear ;a item' });
//   }
// };

// const updateValorUnitario = async (req, res = response) => {
//   const { codigoItem, ...data } = req.body;
//   try {
//     const item = await PTKValoresUnitarios.findOne({
//       where: { codigoItem },
//     });
//     if (!item) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un item por ese id",
//       });
//     }
//     await PTKValoresUnitarios.update(data, {
//       where: { codigoItem }
//     });
//     const itemActualizado = await PTKValoresUnitarios.findOne({ where: { codigoItem } });
//     io.emit("Items--actualizados", {
//       action: "update",
//       msg: `item actualizado: ${itemActualizado.nombreValor}`,
//     });
//     return res.status(201).json({
//       ok: true,
//       item: itemActualizado,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al actualizar la item' });
//   }
// };

// const deleteValorUnitario = async (req, res = response) => {
//   try {
//     const codigoItem = req.params.id;
//     const item = await PTKValoresUnitarios.findOne({
//       where: { codigoItem },
//     });
//     if (!item) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un Items por ese id",
//       });
//     }
//     const itemEliminado = await PTKValoresUnitarios.destroy({
//       where: { codigoItem }
//     });
//     io.emit("Items--actualizados", {
//       action: "delete",
//       msg: `item eliminado: ${itemEliminado.nombreValor}`,
//     });
//     return res.status(201).json({
//       ok: true,
//       item: itemEliminado,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al eliminar usuario item' });
//   }
// };

// module.exports = {
//   getItems,
//   getValoresUnitariosById,
//   createValorUnitario,
//   updateValorUnitario,
//   deleteValorUnitario,
// };

/*
    Author: German Valencia
    Actualizado: German Valencia 20251026
*/
const { response } = require('express'); // Importación de express agregada
const itemsService = require('../services/Items.service'); // Ajusta la ruta a tu proyecto

const getItems = async (req, res = response) => {
  try {
    const Items = await itemsService.obtenerItems();
    return res.status(200).json({
      ok: true,
      Items: Items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener Items' });
  }
};

const getItemById = async (req, res = response) => {
  try {
    const item = await itemsService.obtenerValorUnitarioPorId(req.params.id);
    return res.status(200).json({
      ok: true,
      item: item,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: 'Error al obtener item' });
  }
};

const createItem = async (req, res = response) => {
  try {
    const nuevoItem = await itemsService.crearValorUnitario(req.body);
    return res.status(201).json({
      ok: true,
      item: nuevoItem,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al crear el item' }); // Corregido el typo ';a'
  }
};

const updateItem = async (req, res = response) => {
  try {
    const { codigoItem, ...data } = req.body;
    const itemActualizado = await itemsService.actualizarValorUnitario(codigoItem, data);
    return res.status(200).json({
      ok: true,
      item: itemActualizado,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({ error: 'Error al actualizar el item' });
  }
};

const deleteItem = async (req, res = response) => {
  try {
    const itemEliminado = await itemsService.eliminarItem(req.params.id);
    return res.status(200).json({
      ok: true,
      item: itemEliminado,
      msg: 'item eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({ error: 'Error al eliminar el item' });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};