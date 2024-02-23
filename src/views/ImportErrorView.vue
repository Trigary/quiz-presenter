<script setup lang="ts">
import { importErrorKey, takeTempOrThrow } from '@/globals/temp-storage'

const data = takeTempOrThrow(importErrorKey)
</script>

<template>
  <v-container>
    <v-row justify="center" class="pt-8">
      <h2>{{ data.title }}</h2>
    </v-row>
    <v-row justify="center" class="pt-2">
      <h4>{{ data.message }}</h4>
    </v-row>
    <v-row justify="center" class="pt-2" v-if="data.cause !== null">
      <h4>{{ data.cause }}</h4>
    </v-row>
    <v-row justify="center" class="pt-2">
      <v-btn to="/">Back to home</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>
