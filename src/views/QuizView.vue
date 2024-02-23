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

  <v-container v-else>
    <v-row justify="center">
      <h3>You are all done! Congratulations!</h3>
    </v-row>
  </v-container>

  <v-container class="mt-6">
    <v-row justify="center">
      <v-sheet rounded="lg" class="stats pa-1" style="border: gray 2px ridge">
        <h4 class="text-center">Statistics</h4>
        <p>Remaining questions: {{ bank.getCountRemaining() }} out of {{ bank.getCountTotal() }}</p>
        <p>Correct answers: {{ bank.getCountOfVerdict(AnswerVerdict.Correct) }}</p>
        <p>Wrong answers: {{ bank.getCountOfVerdict(AnswerVerdict.Wrong) }}</p>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<style scoped>
.stats p {
  font-style: italic;
}
</style>
