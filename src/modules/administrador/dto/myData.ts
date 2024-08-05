export const usuarios = ['Usuario1', 'Usuario2', 'Usuario3', 'Usuario4'];

export const roles = ['Admin', 'User', 'Guest', 'Moderator'];

export const rolesMenu: { rol: string; modulos: string[] }[] = [
    { rol: 'ROL1', modulos: [] },
    { rol: 'ROL2', modulos: [] },
    { rol: 'ROL3', modulos: [] },
    { rol: 'ROL4', modulos: [] },
];

export const menus = ['Modulo1', 'Modulo2', 'Modulo3', 'Modulo4', 'Modulo5', 'Modulo6', 'Modulo7', 'Modulo8'];

const LOCAL_STORAGE_KEY = 'usuarioData';

const defaultUsuarioData: Record<string, {
    roles: string[];
    rolMenu: string | null;
    menus: string[];
}> = {
    'Usuario1': {
        roles: ['Admin'],
        rolMenu: 'ROL1',
        menus: ['Modulo1', 'Modulo2'],
    },
    'Usuario2': {
        roles: ['User'],
        rolMenu: 'ROL2',
        menus: ['Modulo3', 'Modulo4'],
    },
    'Usuario3': {
        roles: ['Guest'],
        rolMenu: 'ROL3',
        menus: ['Modulo5', 'Modulo6'],
    },
    'Usuario4': {
        roles: ['Moderator'],
        rolMenu: 'ROL4',
        menus: ['Modulo7', 'Modulo8'],
    },
};

// Función para obtener datos desde localStorage
export const getUsuarioData = () => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
        return JSON.parse(storedData);
    }
    // Si no hay datos en localStorage, devolver los datos predeterminados
    return defaultUsuarioData;
};

// Función para guardar datos en localStorage
export const saveUsuarioData = (data: Record<string, {
    roles: string[];
    rolMenu: string | null;
    menus: string[];
}>) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// Cargar datos al iniciar
const usuarioData = getUsuarioData();
export default usuarioData;
