<script setup lang="ts">
import ControlButton from '@/components/ControlButton.vue'
import type { Ref } from 'vue'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)

const model: Ref<boolean> = defineModel({ required: true })
</script>

<template>
  <ControlButton
    v-if="!model"
    @click="model = true"
    :disabled="props.disabled"
    activation_key="ArrowDown"
    append_icon="mdi-arrow-down"
  >
    Reveal answer
  </ControlButton>
</template>

<style scoped></style>
