import { reactive, type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Question } from '@/logic/entity'
import { QuestionBank } from '@/logic/bank'

import { SimpleNextQuestionStrategy } from '@/logic-impl/strategy/simple'

export const useDataStore = defineStore('data', () => {
  const title = ref(null as null | string)
  const allQuestions = ref(null as null | Question[])
  const bank = ref(null as null | QuestionBank)

  function initialize(mainTitle: string, questions: Question[]) {
    title.value = mainTitle
    allQuestions.value = questions.slice() //shallow copy
    bank.value = reactive(new QuestionBank(
      allQuestions.value,
      (q: Question[]) => new SimpleNextQuestionStrategy(q)
    ))
  }

  function clear() {
    title.value = null
    allQuestions.value = null
    bank.value = null
  }

  function isInitialized(): boolean {
    return title.value !== null
  }

  function getTitle(): Ref<string> {
    if (!isInitialized()) throw Error('Not initialized')
    return title as Ref<string>
  }

  function getAllQuestions(): Ref<Question[]> {
    if (!isInitialized()) throw Error('Not initialized')
    return allQuestions as Ref<Question[]>
  }

  function getBank(): Ref<QuestionBank> {
    if (!isInitialized()) throw Error('Not initialized')
    return bank as Ref<QuestionBank>
  }

  return { initialize, clear, isInitialized, getTitle, getAllQuestions, getBank }
})
