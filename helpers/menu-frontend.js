

const getMenuFrontEnd = (roles) => {
  const menu = [
      {
        titulo: 'Home',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Home/Inicio', url: '/' },
          { titulo: 'Usuarios', url: 'usuarios' }
        ]
      }
    ]    
  roles.forEach(rol => {
    if ( rol.nom === 'ADMIN_ROLE' ) {
      const menuAuth = 
        {
          titulo: 'Administrador',
          icono: 'mdi mdi-hammer-wrench',
          submenu: [
            { titulo: 'Clientes', url: 'clientes' },
            { titulo: 'Empresas', url: 'empresas' },
            { titulo: 'Tipos Informes', url: 'tipos-informes' },
            { titulo: 'Escalas', url: 'escalas' },
            { titulo: 'Roles', url: 'roles' },
            { titulo: 'Rangos', url: 'productividades' },
            { titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Programas', url: 'programas' },
            { titulo: 'Dimensiones', url: 'dimensiones' },
            { titulo: 'Encuestas', url: 'encuestas' },
            { titulo: 'Informes', url: 'informes' }
          ]
        }
      menu.push(menuAuth);
    }
    
    if ( rol.nom === 'ENCUESTADOR_ROLE' ) {
      const menuEncuesta = 
        {
          titulo: 'Encuestador',
          icono: 'mdi mdi-application-edit-outline',
          submenu: [
            { titulo: 'Encuestas', url: 'encuestas' }
          ]
        }
      menu.push(menuEncuesta);
    }

    if ( rol.nom === 'CONSULTOR_ROLE' ) {
      const menuConsultor = 
        {
          titulo: 'Consultor',
          icono: 'mdi mdi-file-account-outline',
          submenu: [
            { titulo: 'Informes', url: 'informes' }
          ]
        }
      menu.push(menuConsultor);
    }
  });
  return menu;
}

module.exports = {
    getMenuFrontEnd
}
