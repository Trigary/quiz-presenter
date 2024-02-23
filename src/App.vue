<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-layout>
    <v-app-bar title="Quiz Presenter">
      <template v-slot:append>
        <v-btn text="Home" to="/" />
        <v-btn text="GitHub" href="https://github.com/Trigary/quiz-presenter" />
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
