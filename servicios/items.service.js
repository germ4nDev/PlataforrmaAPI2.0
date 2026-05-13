const sequelize = require('../database/connection');
// Nota: Dejé PTLItems con 'K' como lo tenías, asumiendo que es correcto.
const PTLItems = require('../models/item')(sequelize);
const { io } = require('../index');

const obtenerItems = async () => {
  return await PTLItems.findAll();
};

const obtenerItemPorId = async (codigoItem) => {
  const item = await PTLItems.findOne({
    where: { codigoItem },
  });
  if (!item) {
    throw { statusCode: 404, msg: "No existe un item por ese id" };
  }
  return item;
};

const crearItem = async (data) => {
  const nuevo = await PTLItems.create(data);
  io.emit("items-actualizados", {
    action: "create",
    msg: `Valor Unitario creado: ${nuevo.nombreItem}`,
  });

  return nuevo;
};

const actualizarItem = async (codigoItem, data) => {
  const item = await PTLItems.findOne({
    where: { codigoItem },
  });
  if (!item) {
    throw { statusCode: 404, msg: "No existe un item por ese id" };
  }
  await PTKItems.update(data, {
    where: { codigoItem }
  });
  const valorUnitarioActualizado = await PTKItems.findOne({
    where: { codigoItem }
  });
  io.emit("items-actualizados", {
    action: "update",
    msg: `Item actualizado: ${valorUnitarioActualizado.nombreItem}`,
  });
  return valorUnitarioActualizado;
};

const eliminarValorUnitario = async (codigoItem) => {
  const item = await PTLItems.findOne({
    where: { codigoItem },
  });
  if (!item) {
    throw { statusCode: 404, msg: "No existe un item por ese id" };
  }
  const nombreItem = item.nombreItem;
  const itemEliminado = await PTLItems.destroy({
    where: { codigoItem }
  });
  io.emit("items-actualizados", {
    action: "delete",
    msg: `Item eliminado: ${nombreItem}`,
  });
  return itemEliminado;
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};