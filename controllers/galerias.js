/*
    Author: German Valencia
    Actualización: Juan Camilo Valencia
*/
const express = require("express");
const path = require("path");
const sequelize = require("../database/connection");
const PTLGaleria = require("../models/galeria")(sequelize);
const { io } = require("../index");

// const borrarArchivoFisico = (fileName) => {
//   if (!fileName || fileName === "no-imagen.png") return;
//   const ext = fileName.split('.').pop().toLowerCase();
//   let subcarpeta = 'imagenes'; // Por defecto busca en imágenes

//   if (['mp4', 'avi', 'mov', 'webm', 'mkv'].includes(ext)) {
//     subcarpeta = 'videos';
//   } else if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'ppt'].includes(ext)) {
//     subcarpeta = 'documentos';
//   }
//   const pathArchivo = path.join(__dirname, "..", "uploads", "plataforma", "biblioteca", "galeria", subcarpeta, fileName);
//   const pathArchivoViejo = path.join(__dirname, "..", "uploads", "plataforma", "galeria", fileName);

//   try {
//     if (fs.existsSync(pathArchivo)) {
//       fs.unlinkSync(pathArchivo);
//       console.log(`Archivo físico eliminado de subcarpeta ${subcarpeta}: ${fileName}`);
//     }
//     else if (fs.existsSync(pathArchivoViejo)) {
//       fs.unlinkSync(pathArchivoViejo);
//       console.log(`Archivo viejo eliminado correctamente: ${fileName}`);
//     } else {
//       console.log(`El archivo no se encontró en ninguna ruta física: ${fileName}`);
//     }
//   } catch (err) {
//     console.error(`Error al intentar eliminar el archivo físico ${fileName}:`, err.message);
//   }
// };

const getGalerias = async(req, res) => {
    try {
        const galerias = await PTLGaleria.findAll();
        return res.status(201).json({
            ok: true,
            galerias: galerias,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener las Galerías" });
    }
};

const getGaleriaById = async(req, res) => {
    try {
        const codigoGaleria = req.params.id;
        const galeria = await PTLGaleria.findOne({
            where: {
                codigoGaleria: codigoGaleria,
            },
        });
        if (!galeria) {
            return res.status(404).json({
                ok: false,
                msg: "No existe una galería con ese id",
            });
        }
        return res.status(201).json({
            ok: true,
            galeria: galeria,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la galería" });
    }
};

const createGaleria = async(req, res = response) => {
    const {...nuevaGaleria } = req.body;
    try {
        console.log('data galeria', nuevaGaleria);
        // const existeSigla = await PTLIdiomas.findOne({
        //     where: { siglaIdioma: data.siglaIdioma }
        // });
        // if (existeSigla) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: `La sigla ${data.siglaIdioma} ya está registrado`
        //     });
        // }
        const nuevo = await PTLGaleria.create(nuevaGaleria);
        console.log('galeria creado', nuevo);
        if (typeof io !== 'undefined') {
            io.emit('galerias-actualizados', {
                action: 'create',
                msg: `Galeria creado: ${nuevo.nombreIdioma}`
            });
        } else {
            console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
        }
        return res.status(201).json({
            ok: true,
            idioma: nuevo,
        });
    } catch (err) {
        // 5. CRÍTICO: Imprime el error real en la consola de Node para debuguear
        console.error('--- ERROR EN CREATE PAQUETE ---');
        console.error(err);

        // Si el error es de Sequelize (base de datos)
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                ok: false,
                error: "Faltan campos obligatorios",
                detalles: err.errors.map(e => e.message)
            });
        }

        res.status(500).json({
            ok: false,
            error: "Error interno en el servidor",
            msg: err.message // Esto te ayudará a ver el error en Postman/Frontend
        });
    }
};

const updateGaleria = async(req, res = response) => {
    try {
        const { codigoGaleria, ...data } = req.body;
        const galeriaDB = await PTLGaleria.findOne({
            where: { codigoGaleria },
        });
        if (!galeriaDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe una galería con ese ID",
            });
        }
        await PTLGaleria.update(data, {
            where: { codigoGaleria },
        });
        const galeriaActualizada = await PTLGaleria.findOne({
            where: { codigoGaleria },
        });
        io.emit("galerias-actualizadas", {
            action: "update",
            msg: `Galería actualizada: ${galeriaActualizada.nombreGaleria}`,
        });
        return res.status(200).json({
            ok: true,
            galeria: galeriaActualizada,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: "Error al actualizar la galería",
        });
    }
};

const deleteGaleria = async(req, res = response) => {
    try {
        const codigoGaleria = req.params.id;
        const galeriaDB = await PTLGaleria.findOne({
            where: { codigoGaleria },
        });
        if (!galeriaDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe una galería con ese ID",
            });
        }
        const galeriaEliminada = await PTLGaleria.destroy({
            where: { codigoGaleria },
        });
        io.emit("galerias-actualizadas", {
            action: "delete",
            msg: `Galería eliminada correctamente`,
        });
        return res.status(200).json({
            ok: true,
            galeria: galeriaEliminada,
            msg: "La galería se eliminó correctamente",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: "Error al eliminar la galería",
        });
    }
};

module.exports = {
    getGalerias,
    getGaleriaById,
    createGaleria,
    updateGaleria,
    deleteGaleria,
};