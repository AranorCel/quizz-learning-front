import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'

const Test = () => {

    const { register, handleSubmit } = useForm()
    const [questions, setQuestions] = useState([{ question: "", answer: "" },]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", answer: "" }]);
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = event.target.value;
        setQuestions(newQuestions);
    };

    const onSubmit = async data => {
        console.log(data)
        await axios
            .post("http://localhost:8000/api/lesson", {
                title: data.title,
                author: data.author,
                discipline: data.discipline,
                cycle: data.cycle,
                description: data.description,
                image: data.image,
                date: Date.now(),
                questions: data.questions
            })
            .then((res) => {
                console.log(res);
            },
                (erreur) => {
                    console.log(erreur);
                }
            );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} method='POST' className='lesson-form'>
            
            <label htmlFor="title">Titre de la leçon</label>
            <input type="text" name="title" id="title" {...register('title', { required: "Vous devez entrer titre pour la leçon" })} />

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
                        value={question.question}
                        onChange={(event) => handleQuestionChange(index, event)}
                    />
                    <br />
                    <label htmlFor={`answer-${index}`}>Réponse {index} : </label>
                    <input
                        type="text"
                        id={`answer-${index}`}
                        value={question.answer}
                        onChange={(event) => handleAnswerChange(index, event)}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddQuestion}>Ajouter une question</button>
            <button type="submit">Envoyer</button>
        </form>
    );
}

export default Test