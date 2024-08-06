// myData.ts

export const usuarios = ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4'];

export const roles = ['Administrador', 'Editor', 'Usuario', 'Invitado'];

export const rolesMenu = [
    { rol: 'Menu 1' },
    { rol: 'Menu 2' },
    { rol: 'Menu 3' },
    { rol: 'Menu 4' }
];

export const menus = ['Dashboard', 'Settings', 'Profile', 'Help'];

export const getUsuarioData = () => {
    const data = localStorage.getItem('usuarioData');
    return data ? JSON.parse(data) : {};
};

export const saveUsuarioData = (data: Record<string, any>) => {
    localStorage.setItem('usuarioData', JSON.stringify(data));
};
