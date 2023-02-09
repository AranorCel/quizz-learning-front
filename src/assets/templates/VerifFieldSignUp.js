import * as yup from "yup";

const VerifFieldSignUp = yup.object({
    firstname: yup
        .string('Prénom incorrect')
        .matches(/^[\w -]{3,}$/, 'Prénom incorrect')
        .required('Prénom obligatoire'),
    lastname: yup
        .string('Nom incorrect')
        .matches(/^[\w -]{3,}$/, 'Nom incorrect')
        .required('Nom obligatoire'),
    email: yup
        .string('Email incorrect')
        .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Email incorrect')
        .required('Email requis'),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, "Mot de passe incorrect")
        .required("Mot de passe requis"),
}).required();

export default VerifFieldSignUp