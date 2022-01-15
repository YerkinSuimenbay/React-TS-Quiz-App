import { shuffleArray } from "./utils"

export type QuestionType = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionStateType = QuestionType & {
    answers: string[]
}

export enum DifficultyEnum {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const fetchQuizQuestions = async (amount: number, difficulty: DifficultyEnum): Promise<QuestionStateType[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
    return data.results.map((question: QuestionType) => (
        { ...question, 
            answers: shuffleArray([ 
                ...question.incorrect_answers, 
                question.correct_answer 
            ]) 
        }))
}