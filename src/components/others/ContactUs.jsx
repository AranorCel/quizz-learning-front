import React, { useState } from 'react';
import { authState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

function ContactUs() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const isConnected = useRecoilValue(authState)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Cher utilisateur, votre message "${message}"sera prochainement traité par nos équipes et une réponse vous sera envoyée à cette adresse ${email}`)
        //Fonctionnalité en cours d'intégration. A développer lors de l'hébergement pour recevoir les notifications sur une adresse mail spécifique
    };

    // Expérimentation de la balise HTML "details" pour afficher ou masquer du contenu.
    return (
        <section className='presentation'>
            {isConnected ? (

                <form onSubmit={handleSubmit} className="contact-form">

                    <details>Cette fonctionnalité est actuellement en cours de développement. Elle sera opérationnelle prochainement.</details>

                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="message">Message</label>
                    <textarea id="message" onChange={(e) => setMessage(e.target.value)} />

                    <button type="submit">Envoyer votre commentaire</button>
                </form>

            ) : (
                <p>Vous devez vous connecter pour nous envoyer votre commentaire.</p>
            )}
        </section>
    );
}

export default ContactUs;
