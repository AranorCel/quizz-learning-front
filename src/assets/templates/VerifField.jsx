import * as yup from "yup";

const VerifField = yup.object({
    firstname: yup
        .string('Prénom incorrect.')
        .matches(/^[\w -]{3,}$/, 'Prénom incorrect.')
        .required('Prénom obligatoire.'),
    lastname: yup
        .string('Nom incorrect.')
        .matches(/^[\w -]{3,}$/, 'Nom incorrect.')
        .required('Nom obligatoire.'),
    login: yup
        .string('Nom incorrect.')
        .matches(/^[\w -]{3,}$/, 'Nom incorrect.')
        .required('Nom obligatoire.'),
    email: yup
        .string('Email incorrect')
        .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Email incorrect')
        .required('Email requis.'),
    emailConfirmation: yup
        .string()
        .test("confirmEmail", "Votre email ne correspond pas.", (value, ctx) => (value === ctx.parent.email)),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, "Mot de passe incorrect.")
        .required("Mot de passe requis"),
    passwordConfirmation: yup
        .string()
        .test("confirmPassword", "Votre mot de passe ne correspond pas.", (value, ctx) => (value === ctx.parent.password)),
    phoneNumber: yup
        .string()
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Numéro de téléphone invalide.')
        .required("Numéro de téléphone requis."),
    streetNumber: yup
        .string()
        .matches(/^\d*$/, "Format de numéro incorrect.")
        .required("Numéro requis."),
    streetName: yup
        .string("Format de rue incorrect.")
        .required("Rue requise."),
    postalCode: yup
        .string()
        .matches(/^\d{5}$/, "Format de code postal incorrect.")
        .required("Code postal de téléphone requis."),
    city: yup
        .string("Format de ville incorrect.")
        .required("Ville requise.")
}).required();

export default VerifField