import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const AddQuizz = () => {

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('');
    const [questions, setQuestions] = useState([{ question: "", choice: ""},]);
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", choice: ""}]);
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
    };

    const handleChoiceChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].choice = event.target.value;
        setQuestions(newQuestions);
    };

    const onSubmit = async data => {
        // Transformer un objet en tableau avec les clés ET les valeurs
        const items = Object.entries(data.response).map(field => {
            // Séparer le numéro d'index du type (question/réponse)
            let [type, index, value] = [field[0].split("-"), field[1]].flat()
            return { type: type, index: index, value: value }
        });

        // Initialiser un tableau avec les clés
        let itemsArray = Array(items.length / 2).fill([])

        // Fusionner les questions et les réponses dans un nouveau tableau avec leurs valeurs à partir d'un index unique
        for (let i = 0; i < items.length; i++) {
            const index = parseInt(items[i].index);
            itemsArray[index] = [...itemsArray[index], [items[i].type, items[i].value]];
        }
    
        // Retransformer les tableaux dans un nouvel objet question / réponse
        itemsArray = itemsArray.map((item) => Object.fromEntries(item))
        console.log(itemsArray)

        try {
            const response = await axios
                .post("http://localhost:8000/api/quizz", {
                    title: data.title,
                    author: data.author,
                    discipline: data.discipline,
                    cycle: data.cycle,
                    description: data.description,
                    image: data.image,
                    date: Date.now(),
                    tests: itemsArray
                });
        } catch (err) {
            setError(err?.message);
        }
        navigate("/quizz")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} method='POST' className='quizz-form'>

            <label htmlFor="title">Titre du quizz</label>
            <input type="text" name="title" id="title" {...register('title', { required: "Vous devez entrer titre pour le quizz" })} />

            <label htmlFor="author">Auteur</label>
            <input type="text" name="author" id="author" {...register('author', { required: true })} />

            <label htmlFor="discipline">Discipline</label>
            <input type="text" name="discipline" id="discipline" {...register('discipline', { required: true })} />

            <label htmlFor="cycle">Cycle</label>
            <input type="text" name="cycle" id="cycle" {...register('cycle', { required: true })} />

            <label htmlFor="description">Description succincte</label>
            <textarea name="description" id="description" {...register('description', { required: true })}></textarea>

            {questions.map((question, index) => (
                <div key={index}>
                    <label htmlFor={`question-${index}`}>Question {index} : </label>
                    <input
                        type="text"
                        id={`question-${index}`}
                        {...register(`response.question-${index.toString().padStart(2, '0')}`)}
                        value={question.question}
                        onChange={(event) => handleQuestionChange(index, event)}
                    />
                    <label htmlFor={`choice-${index}`}>Choix {index} : </label>
                    <input
                        type="text"
                        id={`choice-${index}`}
                        {...register(`response.choice-${index.toString().padStart(2, '0')}`)}
                        value={question.choice}
                        onChange={(event) => handleChoiceChange(index, event)}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddQuestion}>Ajouter une question</button>
            <button type="submit">Envoyer</button>
        </form>
    );
}

export default AddQuizz