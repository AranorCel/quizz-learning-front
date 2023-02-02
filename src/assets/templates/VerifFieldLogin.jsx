import * as yup from "yup";

const VerifFieldLogin = yup.object({
    
    email: yup
        .string('Email incorrect')
        .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Email incorrect')
        .required('Email requis'),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, "Mot de passe incorrect")
        .required("Mot de passe requis"),
}).required();

export default VerifFieldLogin