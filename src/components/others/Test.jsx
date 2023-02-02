import React, { useState } from 'react';

const Test = (props) => {
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuizz = {
            question,
            options: [option1, option2, option3, option4],
            answer,
        };
        props.addQuizz(newQuizz);
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
            />
            <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                placeholder="Option 1"
            />
            <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                placeholder="Option 2"
            />
            <input
                type="text"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                placeholder="Option 3"
            />
            <input
                type="text"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                placeholder="Option 4"
            />
            <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
                <option value="">Choose the correct answer</option>
                <option value={option1}>{option1}</option>
                <option value={option2}>{option2}</option>
                <option value={option3}>{option3}</option>
                <option value={option4}>{option4}</option>
            </select>
            <button type='submit'>Valider</button>
        </form>
    )
}

export default Test