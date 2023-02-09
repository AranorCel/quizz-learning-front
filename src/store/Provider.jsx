import { atom } from 'recoil';

export const teacherState = atom({
    key: 'teacher',
    default: false,
});

export const authState = atom({
    key: 'auth',
    default: false,
});
