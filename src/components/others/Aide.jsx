import React from 'react'
import { NavLink } from 'react-router-dom'

const Aide = () => {
    return (
        <section className='support'>
            <h1>FAQ</h1>
            <h2>Questions fréquemment posées</h2>
            <p>Liste des principales questions rencontrées :</p>
            <ul>
                <li id="how-to-create-an-account">Comment se créer un compte de Professeur ?</li>
                <p>Premièrement, cliquez sur le lien en haut à droite "S'enregistrer". Puis, dans le premier champ, ajoutez une adresse email valide. Des informations pourront vous être communiquées et celle-ci pourra être utilisée pour la récupération de votre mot de passe. Ensuite, vous devez renseigner dans le deuxième champ, votre mot de passe. Celui doit contenir au moins 8 caractrères dont une majuscule, une minuscule, un chiffre et un caractrère spécial. Sachez que ce mot de passe est crypté lors de sa génération et il nous est impossible de le retrouver. Enfin, vous devez renseigner votre prénom et votre nom de famille respectivement dans les troisièmes et quatrièmes champs.</p>

                <li>Comment se connecter une fois le compte créé ?</li>
                <p>Premièrement, cliquez sur le lien "Se connecter" en haut à droite à gauche du lien "S'enregistrer". Si c'est votre première visite et que vous n'avez pas de compte, il faut d'abord suivre la procédure expliquée ci-avant pour <a href="#how-to-create-an-account">S'enregistrer</a>. Si vous êtes déjà enregistré, vous pouvez directement renseigner dans le premier champ, l'adresse mail que vous aviez utilisée pour la création de compte et votre mot de passe dans le second champ prévu à cet effet. Deux cas de figure :</p>
                <ul>
                    <li>Si votre email et votre mot de passe correspondent à votre profil alors vous serez redirigés vers la page d'accueil à partir de laquelle vous pourrez accéder au contenu avec davantage de fonctionnalités.</li>
                    <li>Si votre email et votre mot de passe ne correspondent pas, un message d'erreur vous indiquera si le mail n'existe pas ou si votre mot de passe de correspond pas avec votre compte.</li>
                </ul>
                <p>Pour rappel, les mots de passe sont cryptés automatiquement par sécurité, il nous est impossible de le retrouver.</p>

                <li>Comment créer une leçon ou un quizz ?</li>
                <p>En tant que formateur, vous avez la possiblité de créer des leçons et des quizz en quelques minutes. Pour cela, cliquez sur les liens en haut à gauche respectivement <NavLink to="/lessons" aria-label="Redirection vers la page des leçons">LEÇONS</NavLink> et <NavLink to="/quizz" aria-label="Redirection vers la page des quizz">QUIZZ</NavLink>. Une fois, dans la catégorie de votre choix, votre statut de formateur vous permet d'accéder aux formulaires de création de leçon ou de quizz.</p>
                <h3>Pour créer une leçon :</h3>
                <p id="#liste">Il est d'abord nécessaire d'ajouter un titre, un nom de créateur de contenu, la discipline et le cycle. Pour rappel, les cycles sont :</p>
                <ul>
                    <li>Cycle 1 : Maternelle (PS, MS & GS)</li>
                    <li>Cycle 2 : CP, CE1 & CE2</li>
                    <li>Cycle 3 : CM1, CM2 & 6ème</li>
                    <li>Cycle 4 : 5ème, 4ème & 3ème</li>
                    <li>Cycle 5 : Seconde, 1ère, Terminale</li>
                    <li>Cycle 6 : Supérieur</li>
                    <li>Hors cycle : Autres connaissances ne s'inscrivant pas dans le cycle du BO (Bulletin Officiel)</li>
                </ul>

                <p>Ensuite, on ajoute des notions sous la forme de "question & réponse". Il est possible d'ajouter autant de notions que nécessaire en cliquant sur le bouton "Ajouter une question" ce qui générera automatiquement une nouvelle paire de champs "question & réponse".</p>

                <p>Une fois la leçon créée, celle-ci est accessible :</p>
                <ul>
                    <li>soit dans l'onglet spécifique des <NavLink to="/lessons" aria-label="Redirection vers la page des leçons">LEÇONS</NavLink>,</li>
                    <li>soit sur la page d'accueil s'il s'agit d'une des trois dernières leçons ajoutée.</li>
                </ul>

                <h3>Pour créer un quizz :</h3>
                <p>Il est d'abord nécessaire d'ajouter un titre, un nom de créateur de contenu, la discipline et le cycle. Pour la liste des cycles, il convient de se rapporter au paragraphe précédent sur la création des leçons.</p>

                <p>Ensuite, on ajoute des questions, les quatre choix (format QCM) et la réponse. Comme pour les leçons, il est possible d'ajouter autant de questions que nécessaire, en cliquant sur le bouton "Ajouter une question" ce qui générera automatiquement un nouvel ensembe de "question, choix, réponse".</p>

                <p>Une fois le quizz créé, celui-ci est accessible :</p>
                <ul>
                    <li>soit dans l'onglet spécifique des <NavLink to="/quizz" aria-label="Redirection vers la page des quizz">QUIZZ</NavLink>,</li>
                    <li>soit sur la page d'accueil s'il s'agit d'un des trois derniers quizz ajouté.</li>
                </ul>
            </ul>
        </section>
    )
}

export default Aide