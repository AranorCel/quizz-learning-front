import { atom } from 'recoil';

export const teacherState = atom({
    key: 'teacher',
    default: null,
});

export const authState = atom({
    key: 'auth',
    default: null,
});
