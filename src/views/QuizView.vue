<script setup lang='ts'>
import { useDataStore } from '@/globals/data'
import { AnswerVerdict } from '@/logic/bank'
import { computed } from 'vue'
import typeManager from '@/globals/types'

const bank = useDataStore().getBank()
const key = computed(() => bank.value.getCountOfVerdict(AnswerVerdict.Correct)
  + bank.value.getCountOfVerdict(AnswerVerdict.Wrong)) // Force re-rendering, TODO is it needed?
</script>

<template>
  <h1>{{ useDataStore().getTitle() }}</h1>

  <Component
    v-if='bank.hasRemaining()'
    :key='key'
    :is='typeManager.renderer(bank.getCurrent())'
    :question='bank.getCurrent()' />

  <template v-else>
    Done
  </template>

  <ul class='pt-4'>
    <li>Remaining: {{ bank.getCountRemaining() }} out of {{ bank.getCountTotal() }}</li>
    <li>Correct answers: {{ bank.getCountOfVerdict(AnswerVerdict.Correct) }}</li>
    <li>Wrong answers: {{ bank.getCountOfVerdict(AnswerVerdict.Wrong) }}</li>
  </ul>
</template>

<style scoped>

</style>