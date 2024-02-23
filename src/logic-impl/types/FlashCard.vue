<script setup lang="ts">
import type { FlashCardQuestion } from '@/logic-impl/types/flash-card'
import ContentDisplayer from '@/logic-impl/types/common/ContentDisplayer.vue'
import ControlButton from '@/components/ControlButton.vue'
import { AnswerVerdict } from '@/logic/bank'
import { useDataStore } from '@/globals/data'
import { ref } from 'vue'
import RevealButton from '@/logic-impl/types/common/RevealButton.vue'

const props = defineProps<{
  question: FlashCardQuestion
}>()

const advance = (verdict: AnswerVerdict) => {
  useDataStore().getBank().value.advance(verdict)
}

const revealed = ref(false)
</script>

<template>
  <ContentDisplayer :content="props.question.question" />
  <ContentDisplayer v-if="revealed" :content="props.question.answer.content" />

  <RevealButton v-model="revealed" />
  <div v-if="revealed">
    <ControlButton
      activation_key="ArrowLeft"
      @click="advance(AnswerVerdict.Wrong)"
      prepend_icon="mdi-arrow-left"
      >Wrong</ControlButton
    >
    <ControlButton
      activation_key="ArrowRight"
      @click="advance(AnswerVerdict.Correct)"
      append_icon="mdi-arrow-right"
      >Correct</ControlButton
    >
  </div>
</template>

<style scoped></style>
