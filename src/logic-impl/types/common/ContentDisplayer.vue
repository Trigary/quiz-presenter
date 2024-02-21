<script setup lang="ts">
import type { DisplayableContent } from '@/logic/entity'

const props = defineProps<{
  content: DisplayableContent
}>()
</script>

<template>
  {{ props.content.rawText }}
</template>

<style scoped></style>
