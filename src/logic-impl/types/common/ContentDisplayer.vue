<script setup lang="ts">
import type { DisplayableContent } from '@/logic/entity'
import md from '@/plugins/text-rendering'
import { ref } from 'vue'

const props = defineProps<{
  content: DisplayableContent
}>()

const content = ref(md.render(props.content.rawText.replace(new RegExp('\\\\n', 'g'), '\n')))
</script>

<template>
  <div class="markdown-body" v-html="content" />
</template>

<style scoped></style>
