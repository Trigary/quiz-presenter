<script setup lang="ts">
import { useDataStore } from '@/globals/data'
import { AnswerVerdict } from '@/logic/bank'
import { computed } from 'vue'
import typeManager from '@/globals/types'

const bank = useDataStore().getBank()
const questionComponentKey = computed(
  () =>
    bank.value.getCountOfVerdict(AnswerVerdict.Correct) +
    bank.value.getCountOfVerdict(AnswerVerdict.Wrong)
) // Force re-rendering of the question component when the next question should be displayed
</script>

<template>
  <v-container class="mb-3">
    <v-row justify="center">
      <h1>{{ useDataStore().getTitle().value }}</h1>
    </v-row>
  </v-container>

  <Component
    v-if="bank.hasRemaining()"
    :key="questionComponentKey"
    :is="typeManager.renderer(bank.getCurrent())"
    :question="bank.getCurrent()"
  />

  <template v-else>Done</template>

  <ul class="pt-4">
    <li>Remaining: {{ bank.getCountRemaining() }} out of {{ bank.getCountTotal() }}</li>
    <li>Correct answers: {{ bank.getCountOfVerdict(AnswerVerdict.Correct) }}</li>
    <li>Wrong answers: {{ bank.getCountOfVerdict(AnswerVerdict.Wrong) }}</li>
  </ul>
</template>

<style scoped></style>
