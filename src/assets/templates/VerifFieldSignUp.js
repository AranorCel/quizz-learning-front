import * as yup from "yup";

const VerifFieldSignUp = yup.object({
    firstname: yup
        .string()
        .required('Veuillez saisir votre prénom')
        .matches(/^[\w -]{3,50}$/, 'Prénom incorrect'),
    lastname: yup
        .string()
        .required('Veuillez saisir votre nom')
        .matches(/^[\w -]{3,50}$/, 'Nom incorrect'),
    email: yup
        .string()
        .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Email incorrect')
        .max(250)
        .required('Veuillez saisir une adresse mail'),
    password: yup
        .string()
        .required('Veuillez renseigner votre mot de passe.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, "Format de mot de passe incorrect."),
}).required();

export default VerifFieldSignUp