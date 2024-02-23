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
  <v-container>
    <v-row justify="center">
      <v-sheet
        style="border: 2px solid white"
        class="pa-2"
        rounded="shaped"
        max-width="85%"
        min-width="25%"
      >
        <ContentDisplayer :content="props.question.question" />
      </v-sheet>
    </v-row>

    <v-row v-if="revealed" justify="center" class="mt-6">
      <v-sheet
        style="border: 2px solid white"
        class="pa-2"
        rounded="xl"
        max-width="85%"
        min-width="25%"
      >
        <ContentDisplayer :content="props.question.answer.content" />
      </v-sheet>
    </v-row>

    <v-row justify="center" class="mt-6">
      <RevealButton v-model="revealed" />

      <template v-if="revealed">
        <ControlButton
          class="mr-12"
          activation_key="ArrowLeft"
          @click="advance(AnswerVerdict.Wrong)"
          prepend_icon="mdi-arrow-left"
          >Wrong
        </ControlButton>

        <ControlButton
          activation_key="ArrowRight"
          @click="advance(AnswerVerdict.Correct)"
          append_icon="mdi-arrow-right"
          >Correct
        </ControlButton>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped></style>
