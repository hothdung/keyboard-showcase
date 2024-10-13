<template>
  <div>
    <div class="button-container">
      <button @click="onClick">Click Me!</button>
    </div>
    <span :class="{ green: activateColor }">Welcome&nbsp;</span>
    <span :class="{ orange: activateColor }">to&nbsp;</span>
    <span :class="{ red: activateColor }">our page!</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useShortcutHandler } from '../composables/useShortcutHandler'

useShortcutHandler('welcome-message', onClick)

const activateColor = ref(false)

function onClick(): void {
  activateColor.value = true
}
</script>
<style scoped>
span {
  font-weight: bold;
  font-size: 24px;
  font-family: 'Roboto';
}

.green {
  color: green;
}

.orange {
  color: orange;
}

.red {
  color: red;
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
