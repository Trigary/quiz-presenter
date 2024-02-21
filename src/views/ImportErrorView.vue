<script setup lang="ts">
import { importErrorKey, takeTempOrThrow } from '@/globals/temp-storage'

const data = takeTempOrThrow(importErrorKey)
</script>

<template>
  <v-container>
    <v-row class="justify-center pt-8">
      <h2>{{ data.title }}</h2>
    </v-row>
    <v-row class="justify-center pt-2">
      <h3>{{ data.message }}</h3>
    </v-row>
    <v-row class="justify-center pt-2" v-if="data.cause !== null">
      <h3>{{ data.cause }}</h3>
    </v-row>
    <v-row class="justify-center pt-2">
      <v-btn to="/">Back to home</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>
