import * as yup from "yup";

const VerifField = yup.object({
    title: yup
        .string('Titre incorrect')
        .matches(/^[\w -]{3,}$/, 'Titre incorrect')
        .required('Titre obligatoire'),
    author: yup
        .string("Nom d'auteur incorrect")
        .matches(/^[\w -]{3,}$/, "Nom d'auteur incorrect")
        .required("Nom d'auteur obligatoire"),
    discipline: yup
        .string('Discipline incorrecte')
        .matches(/^[\w -]{3,}$/, 'Discipline incorrecte')
        .required('Discipline obligatoire'),
}).required();

export default VerifField