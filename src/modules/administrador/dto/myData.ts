// myData.ts

export const usuarios = ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4'];

export const roles = ['Administrador', 'Editor', 'Usuario', 'Invitado'];

export const rolesRuta = [
    { rol: 'Ruta 1' },
    { rol: 'Ruta 2' },
    { rol: 'Ruta 3' },
    { rol: 'Ruta 4' }
];

export const rutas = ['Dashboard', 'Settings', 'Profile', 'Help'];

export const getUsuarioData = () => {
    const data = localStorage.getItem('usuarioData');
    return data ? JSON.parse(data) : {};
};

export const saveUsuarioData = (data: Record<string, any>) => {
    localStorage.setItem('usuarioData', JSON.stringify(data));
};

