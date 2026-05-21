/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const UploadsService = require("../services/uploads.service");
const service = new UploadsService();

const uploadResource = async (req, res = response) => {
    try {
        const { suscriptorId, type } = req.params;

        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            return res.status(400).json({ ok: false, msg: 'No hay archivos para subir' });
        }

        const fileName = await service.uploadFile(req.files.archivo, suscriptorId, type);

        res.status(201).json({
            ok: true,
            msg: 'Archivo almacenado correctamente',
            fileName
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const showResource = (req, res = response) => {
    try {
        const { suscriptorId, type, fileName } = req.params;
        const pathFile = service.getFilePath(suscriptorId, type, fileName);

        if (!pathFile) {
            return res.status(404).json({ ok: false, msg: 'Recurso no encontrado' });
        }

        res.sendFile(pathFile);
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteResource = async (req, res = response) => {
    try {
        const { suscriptorId, type, fileName } = req.params;

        const fueBorrado = await service.deleteFile(suscriptorId, type, fileName);

        if (!fueBorrado) {
            return res.status(404).json({ ok: false, msg: 'El archivo no existe en el servidor' });
        }

        res.status(200).json({
            ok: true,
            msg: 'Archivo eliminado físicamente del servidor'
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const clearCategoryFolder = async (req, res = response) => {
    try {
        const { suscriptorId, type } = req.params;

        const resultado = await service.deleteFolderContent(suscriptorId, type);

        res.status(200).json({
            ok: true,
            msg: resultado
                ? `Se ha limpiado el contenido de la carpeta ${type}`
                : `La carpeta ${type} no existía o ya estaba vacía`
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};


module.exports = {
    uploadResource,
    showResource,
    deleteResource,
    clearCategoryFolder
};