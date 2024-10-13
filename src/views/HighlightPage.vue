<template>
  <div class="highlight">
    <div class="button-container">
      <button @click="onClick">Show Pic!</button>
    </div>
    <img v-if="isVisible" src="../assets/dolomiten.jpg" />
  </div>
</template>
<script setup lang="ts">
import { useShortcutHandler } from '@/composables/useShortcutHandler'
import { ref } from 'vue'
const isVisible = ref(false)

useShortcutHandler('show-image', onClick)

function onClick(): void {
  isVisible.value = true
}
</script>
<style scoped>
.highlight {
  font-weight: bold;
  font-size: 24px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

button {
  width: 100px;
  height: 30px;
  background-color: #89cff0;
  border-radius: 12px;
  border: none;
  font-family: 'Roboto';
  font-weight: bold;
}
</style>
