<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-layout>
    <v-app-bar title="Quiz Presenter">
      <template v-slot:append>
        <v-btn prepend-icon="mdi-home" text="Home" to="/" />
        <v-btn
          prepend-icon="mdi-bookshelf"
          text="Wiki"
          href="https://github.com/Trigary/quiz-presenter/wiki"
        />
        <v-btn
          prepend-icon="mdi-github"
          text="Source Code"
          href="https://github.com/Trigary/quiz-presenter"
        />
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
