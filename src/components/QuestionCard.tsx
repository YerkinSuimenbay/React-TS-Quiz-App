import React from "react"
import { AnswerObjectType } from "../App"

type PropsType = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement >) => void;
    userAnswer: AnswerObjectType | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<PropsType> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => {
    return (
        <div>
            <p className="number">Question: {questionNr} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map(answer => (
                    <div key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard