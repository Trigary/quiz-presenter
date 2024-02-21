<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    activation_key?: string
    prepend_icon?: string
    append_icon?: string
  }>(),
  {
    disabled: false
  }
)

const emit = defineEmits<{
  (e: 'click'): void //or activated via keyboard
}>()

const listener = (e: KeyboardEvent) => {
  if (e.key === props.activation_key && !props.disabled) emit('click')
}
onMounted(() => addEventListener('keyup', listener))
onUnmounted(() => removeEventListener('keyup', listener))
</script>

<template>
  <v-btn
    :disabled="props.disabled"
    @click="emit('click')"
    :prepend-icon="props.prepend_icon"
    :append-icon="props.append_icon"
  >
    <slot />
  </v-btn>
</template>

<style scoped></style>
