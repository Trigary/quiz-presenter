<script setup lang="ts">
import type { DisplayableContent } from '@/logic/entity'
import md from '@/plugins/text-rendering'
import { ref } from 'vue'

const props = defineProps<{
  content: DisplayableContent
}>()

const content = ref(md.render(props.content.rawText))
</script>

<template>
  <div v-html="content" />
</template>

<style scoped></style>
