<script setup lang="ts" generic="T extends { answer: Answer; style: Ref<AnswerStyle> }">
import type { Answer, Question } from '@/logic/entity'
import ContentDisplayer from '@/logic-impl/types/common/ContentDisplayer.vue'
import type { AnswerVerdict } from '@/logic/bank'
import { computed, type Ref, ref } from 'vue'
import { shuffle } from '@/utils/collections'
import ControlButton from '@/components/ControlButton.vue'
import { useDataStore } from '@/globals/data'
import RevealButton from '@/logic-impl/types/common/RevealButton.vue'
import type { AnswerStyle } from '@/logic-impl/types/common/question-base'

const props = withDefaults(
  defineProps<{
    question: Question
    answers: T[]
    verdict: AnswerVerdict | null //null means the user is yet to answer and can't continue
    shuffleAnswers?: boolean
  }>(),
  {
    shuffleAnswers: true
  }
)

const emit = defineEmits<{
  (e: 'answerClick', answer: T): void
}>()

const shuffledAnswers = computed(() => {
  const copy = props.answers.slice()
  if (props.shuffleAnswers) shuffle(copy)
  return copy
})

const answerClicked = (answer: T) => {
  if (!revealed.value) emit('answerClick', answer)
}

const advance = () => {
  useDataStore().getBank().value.advance(props.verdict!)
}

const revealed = ref(false)
</script>

<template>
  <v-container>
    <v-row justify="center" class="mb-4">
      <v-sheet style="border: 2px solid white" class="pa-2" max-width="85%" min-width="25%">
        <ContentDisplayer :content="props.question.question" />
      </v-sheet>
    </v-row>

    <!--eslint-disable-next-line vue/valid-v-for-->
    <v-row v-for="ans in shuffledAnswers" justify="center" class="mb-3">
      <v-sheet
        class="pa-2"
        max-width="85%"
        min-width="25%"
        rounded="xl"
        :color="revealed ? ans.style.value.revealed.color : ans.style.value.hidden.color"
        :style="
          'border: 2px solid ' +
          (revealed ? ans.style.value.revealed.border : ans.style.value.hidden.border)
        "
        @click="answerClicked(ans)"
      >
        <ContentDisplayer :content="ans.answer.content" />
      </v-sheet>
    </v-row>

    <v-row justify="center" class="mt-6">
      <RevealButton :disabled="props.verdict === null" v-model="revealed" />

      <ControlButton
        v-if="props.verdict !== null && revealed"
        activation_key="ArrowDown"
        @click="advance()"
        append_icon="mdi-arrow-down"
      >
        Continue
      </ControlButton>
    </v-row>
  </v-container>
</template>

<style scoped></style>
