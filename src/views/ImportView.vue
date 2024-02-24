<script setup lang="ts">
import { useDataStore } from '@/globals/data'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import typeManager from '@/globals/types'
import type { QuizJson } from '@/logic/type'
import router from '@/plugins/router'
import { importErrorKey, setTemp } from '@/globals/temp-storage'
import { urlRule } from '@/utils/rules'
import { copyToClipboard } from '@/utils/clipboard'

const displayProgressSpinner = ref(false)

const handleError = (title: string, message: string, cause: unknown | null = null) => {
  console.error('Handling error: ' + title, message, cause)
  setTemp(importErrorKey, { title, message, cause })
  router.push('/import-error')
}

const loadJson = (rawJson: string) => {
  try {
    const json = JSON.parse(rawJson) as QuizJson
    const title = json.title
    const questions = json.questions.map((v) => typeManager.parse(v))
    useDataStore().initialize(title, questions)
    router.push('/quiz')
  } catch (e) {
    handleError('JSON parse error', `Failed to parse JSON`, e)
  }
}

const sourceUrl = ref((useRoute().query.src as string | undefined) || '')
const loadUrl = async () => {
  try {
    displayProgressSpinner.value = true
    const response = await fetch(new URL(sourceUrl.value))
    if (!response.ok) {
      handleError(
        'Data fetch error',
        `Failed to fetch ${sourceUrl.value}: ${response.status} ${response.statusText}`
      )
    } else {
      loadJson(await response.text())
    }
  } catch (e) {
    handleError('Data fetch error', `Failed to fetch ${sourceUrl.value}`, e)
  }
}
const convertedUrl = computed(() => {
  if (typeof urlRule(sourceUrl.value) === 'string') return ''
  return window.location.href + '?src=' + encodeURIComponent(sourceUrl.value)
})
if (sourceUrl.value !== '') loadUrl()

const sourceFile = ref([] as File[])
const loadFile = async () => {
  displayProgressSpinner.value = true
  loadJson(await sourceFile.value[0].text())
}
</script>

<template>
  <v-container class="pt-9">
    <v-row justify="center">
      <h2>File input</h2>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" lg="6" class="mx-auto">
        <v-file-input v-model="sourceFile" label="Select a file" accept=".json" hide-details />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn @click="loadFile" :disabled="sourceFile.length === 0">Load from file</v-btn>
    </v-row>
  </v-container>

  <v-divider class="mt-4 mb-2 mx-auto" thickness="4" length="80%" />

  <v-container>
    <v-row justify="center">
      <h2>URL input</h2>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" lg="6" class="mx-auto">
        <v-text-field
          v-model="sourceUrl"
          label="Enter a URL"
          :rules="[urlRule]"
          prepend-icon="mdi-web"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" lg="6" class="mx-auto pt-0">
        <v-text-field
          v-model="convertedUrl"
          label="Direct URL to loaded data"
          readonly
          hide-details
          variant="outlined"
        >
          <template #append>
            <v-btn @click="copyToClipboard(convertedUrl)" :disabled="convertedUrl === ''"
              >Copy
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn @click="loadUrl" :disabled="convertedUrl === ''">Open from URL</v-btn>
    </v-row>
  </v-container>

  <v-divider class="mt-4 mb-2 mx-auto" thickness="4" length="80%" />

  <v-container>
    <v-row justify="center">
      <h2>Need help?</h2>
    </v-row>
    <v-row justify="center">
      <p>
        Check out the <a href="https://github.com/Trigary/quiz-presenter/wiki">Wiki page</a> for
        detailed instructions.
      </p>
    </v-row>
  </v-container>

  <v-overlay
    v-if="displayProgressSpinner"
    :model-value="displayProgressSpinner"
    class="align-center justify-center delayed"
  >
    <v-progress-circular indeterminate size="120" width="6" />
  </v-overlay>
</template>

<style scoped>
.delayed {
  opacity: 0;
  animation-name: fadeIn;
  animation-fill-mode: forwards;
  animation-delay: 100ms;
  animation-duration: 500ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
