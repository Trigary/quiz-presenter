<script setup lang='ts'>
import { MultipleChoiceAnswer, type MultipleChoiceQuestion } from '@/logic-impl/types/multiple-choice'
import QuestionBase from '@/logic-impl/types/common/QuestionBase.vue'
import { computed, type Ref, ref } from 'vue'
import { AnswerVerdict } from '@/logic/bank'
import { AnswerStyle, AnswerSubStyle } from '@/logic-impl/types/common/question-base'

const props = defineProps<{
  question: MultipleChoiceQuestion
}>()

type Answer = {
  answer: MultipleChoiceAnswer
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
          answer.correct ? selected.value ? 'green' : 'orange' : selected.value ? 'red' : 'gray',
          selected.value ? 'blue' : ''
        )
      )),
      selected: selected
    }
  })
})

const verdict = computed(() => answers.value.every(a => a.selected.value === a.answer.correct)
  ? AnswerVerdict.Correct
  : AnswerVerdict.Wrong)
</script>

<template>
  <QuestionBase :question='props.question'
                :verdict='verdict' :answers='answers'
                @answer-click='(a) => a.selected.value = !a.selected.value' shuffle-answers />
</template>

<style scoped>

</style>