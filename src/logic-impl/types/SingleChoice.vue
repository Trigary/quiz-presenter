<script setup lang='ts'>
import { SingleChoiceAnswer, type SingleChoiceQuestion } from '@/logic-impl/types/single-choice'
import QuestionBase from '@/logic-impl/types/common/QuestionBase.vue'
import { computed, type Ref, ref } from 'vue'
import { AnswerVerdict } from '@/logic/bank'
import { AnswerStyle, AnswerSubStyle } from '@/logic-impl/types/common/question-base'

const props = defineProps<{
  question: SingleChoiceQuestion
}>()

type Answer = {
  answer: SingleChoiceAnswer
  style: Ref<AnswerStyle>
  selected: Ref<boolean>
}

const answers: Ref<Answer[]> = computed(() => {
  return props.question.choices.map(answer => {
    const selected = ref(false)
    return {
      answer: answer,
      style: computed(() => new AnswerStyle(
        /*hidden:*/ new AnswerSubStyle('gray', selected.value ? 'blue' : ''),
        /*revealed:*/ new AnswerSubStyle(
          answer.correct ? 'green' : (selected.value ? 'red' : 'gray'),
          selected.value ? 'blue' : ''
        )
      )),
      selected: selected
    }
  })
})

const verdict = ref(null as AnswerVerdict | null)

const answerClicked = (clicked: Answer) => {
  answers.value.forEach(a => a.selected.value = false)
  clicked.selected.value = true
  verdict.value = clicked.answer.correct ? AnswerVerdict.Correct : AnswerVerdict.Wrong
}
</script>

<template>
  <QuestionBase :question='props.question'
                :verdict='verdict' :answers='answers'
                @answer-click='(a) => answerClicked(a)' shuffle-answers />
</template>

<style scoped>

</style>