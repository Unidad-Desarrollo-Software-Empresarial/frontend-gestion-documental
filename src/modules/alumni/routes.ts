import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./pages/AlumniPage.vue'),
        meta: {
            requiresAuth: true,
        }
    },
];

export default routes;