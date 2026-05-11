const sequelize = require("../database/connection");
const PTLBiblioteca = require("../models/biblioteca")(sequelize);
const { io } = require("../index");

const obtenerBibliotecas = async () => {
    return await PTLBiblioteca.findAll();
};

const obtenerBibliotecaPorId = async (codigoBiblioteca) => {
    const biblioteca = await PTLBiblioteca.findOne({
        where: { codigoBiblioteca },
    });

    if (!biblioteca) {
        throw { statusCode: 404, msg: "No existe una biblioteca por ese id" };
    }

    return biblioteca;
};

const crearBiblioteca = async (data) => {
    const existente = await PTLBiblioteca.findOne({
        where: { codigoAplicacion: data.codigoAplicacion }
    });

    if (existente) {
        throw { statusCode: 400, msg: 'Ya existe una biblioteca para esa aplicacion' };
    }

    const existeNombre = await PTLBiblioteca.findOne({
        where: { nombreBiblioteca: data.nombreBiblioteca }
    });

    if (existeNombre) {
        throw { statusCode: 400, msg: 'Ya existe una biblioteca con ese nombre' };
    }

    const nuevo = await PTLBiblioteca.create(data);

    io.emit('bibliotecas-actualizadas', {
        action: 'create',
        msg: `biblioteca creado: ${nuevo.nombreBiblioteca}`
    });

    return nuevo;
};

const actualizarBiblioteca = async (codigoBiblioteca, data) => {
    const bibliotecaDB = await PTLBiblioteca.findOne({
        where: { codigoBiblioteca },
    });

    if (!bibliotecaDB) {
        throw { statusCode: 404, msg: "No existe una biblioteca con ese ID" };
    }

    await PTLBiblioteca.update(data, {
        where: { codigoBiblioteca },
    });

    const bibliotecaActualizada = await PTLBiblioteca.findOne({
        where: { codigoBiblioteca },
    });

    io.emit("bibliotecas-actualizadas", {
        action: "update",
        msg: `Biblioteca actualizada: ${bibliotecaActualizada.nombreBiblioteca}`,
    });

    return bibliotecaActualizada;
};

const eliminarBiblioteca = async (codigoBiblioteca) => {
    const bibliotecaDB = await PTLBiblioteca.findOne({
        where: { codigoBiblioteca },
    });

    if (!bibliotecaDB) {
        throw { statusCode: 404, msg: "No existe un biblioteca con ese ID" };
    }

    const bibliotecaEliminada = await PTLBiblioteca.destroy({
        where: { codigoBiblioteca },
    });

    io.emit("bibliotecas-actualizadas", {
        action: "delete",
        msg: `Biblioteca eliminada correctamente`,
    });

    return bibliotecaEliminada; // Se puede retornar por si se necesita
};

module.exports = {
    obtenerBibliotecas,
    obtenerBibliotecaPorId,
    crearBiblioteca,
    actualizarBiblioteca,
    eliminarBiblioteca,
};