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
    //TODO display load spinner
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
  loadJson(await sourceFile.value[0].text())
}
</script>

<template>
  <v-container class="pt-9">
    <v-row class="justify-center">
      <h2>File input</h2>
    </v-row>
    <v-row class="v-col-12 v-col-md-9 v-col-lg-6 mx-auto">
      <v-file-input
        v-model="sourceFile"
        label="Select a file"
        accept=".json"
        :prepend-icon="undefined"
      />
    </v-row>
    <v-row class="justify-center">
      <v-btn @click="loadFile" :disabled="sourceFile.length === 0">Load from file</v-btn>
    </v-row>
  </v-container>

  <v-divider class="mt-4 v-col-9 mx-auto" thickness="4" />

  <v-container>
    <v-row class="justify-center">
      <h2>URL input</h2>
    </v-row>
    <v-row class="v-col-12 v-col-md-9 v-col-lg-6 mx-auto">
      <v-text-field v-model="sourceUrl" label="Enter a URL" :rules="[urlRule]" />
    </v-row>
    <v-row class="v-col-12 v-col-md-9 v-col-lg-6 mx-auto pt-0">
      <v-text-field
        v-model="convertedUrl"
        label="Direct URL to loaded data"
        readonly
        hide-details
      />
      <v-btn
        @click="copyToClipboard(convertedUrl)"
        class="ml-4 align-self-center"
        :disabled="convertedUrl === ''"
        >Copy
      </v-btn>
    </v-row>
    <v-row class="justify-center">
      <v-btn @click="loadUrl" :disabled="convertedUrl === ''">Open from URL</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>
