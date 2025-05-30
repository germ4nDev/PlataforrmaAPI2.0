const jwt = require('jsonwebtoken');

const generarJWT = ( usuarioId, userNameUsuario, correoUsuario ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = {
            usuarioId, userNameUsuario, correoUsuario
        };
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}


module.exports = {
    generarJWT,
}