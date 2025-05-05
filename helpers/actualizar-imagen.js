const Usuario = require('../models/usuario-role');
const Cliente = require('../models/cliente');
const Programa = require('../models/programa');
const Empresa = require('../models/empresa');
const fs = require('fs');

// const Medico = require('../models/cliente');
// const Hospital = require('../models/programa');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'clientes':
            const cliente = await Cliente.findById(id);
            if ( !cliente ) {
                console.log('No es un méclientedico por id');
                return false;
            }

            pathViejo = `./uploads/clientes/${ cliente.img }`;
            borrarImagen( pathViejo );

            cliente.img = nombreArchivo;
            await cliente.save();
            return true;

        break;
        
        case 'programas':
            const programa = await Programa.findById(id);
            if ( !programa ) {
                console.log('No es un programa por id');
                return false;
            }

            pathViejo = `./uploads/programmas/${ programa.img }`;
            borrarImagen( pathViejo );

            programa.img = nombreArchivo;
            await programa.save();
            return true;

        break;
        
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;

        case 'empresas':
            const empresa = await Empresa.findById(id);
            if ( !empresa ) {
                console.log('No es un empresa por id');
                return false;
            }

            pathViejo = `./uploads/empresas/${ empresa.img }`;
            borrarImagen( pathViejo );

            empresa.img = nombreArchivo;
            await empresa.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
