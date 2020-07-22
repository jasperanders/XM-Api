import { Router } from 'express'
import { env, mongo, port, ip, apiRoot } from '~/config'
import { doorman } from '~/services/auth/guard'
/* ENDPOINT_ROUTER_IMPORT */
import multiple_choice_answer, { MultipleChoiceAnswer } from './multiple_choice_answer'
import multiple_choice_question, { MultipleChoiceQuestion } from './multiple_choice_question'
import free_text_answer, { FreeTextAnswer } from './free_text_answer'
import free_text_question, { FreeTextQuestion } from './free_text_question'
import answer, { Answer } from './answer'
import question, { Question } from './question'
import exam, { Exam } from './exam'
import auth from './auth'
import verification from './verification'
import passwordReset from './password-reset'
import user, { User } from './user'
import message, { Message } from './message'

const router = new Router()

/* ENDPOINT_ROUTER_EXPORT */
router.use('/multiple_choice_answers', multiple_choice_answer)
router.use('/multiple_choice_questions', multiple_choice_question)
router.use('/free_text_answers', free_text_answer)
router.use('/free_text_questions', free_text_question)
router.use('/answers', answer)
router.use('/questions', question)
router.use('/exams', exam)
router.use('/auth', auth)
router.use('/verification', verification)
router.use('/users', user)
router.use('/messages', message)
router.use('/password-reset', passwordReset)

// Export the relevant models for swagger documentation
export const Models = [
    /* ENDPOINT_DOCS_EXPORT */
MultipleChoiceAnswer,
MultipleChoiceQuestion,
FreeTextAnswer,
FreeTextQuestion,
Answer,
Question,
Exam,
    User,
    Message
]

// Export router for Express Server
export default router
