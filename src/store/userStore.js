import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(persist(
    (set) => ({
        userId: '',
        name: '',
        userRole: '',
        setUser: (userId, name, userRole) => set({
            userId,
            name,
            userRole
        }),
    }),
    {
        name: 'user-storage', // nombre único para el almacenamiento
        getStorage: () => localStorage, // (opcional) por defecto se usa 'localStorage'
    }
));