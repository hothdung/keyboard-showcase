<template>
  <div>
    <div class="header">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/highlight">Highlight</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import router from './router'
import { useShortcutHandler } from './composables/useShortcutHandler'

const route = useRoute()
const selection = useShortcutHandler('navigation', handleNavigation)

function onClick(): void {
  router.push({ name: 'highlight' })
}

function handleNavigation(): void {
  switch (selection.value) {
    case 'W': {
      router.push({ name: 'home' })
      break
    }
    case 'H': {
      router.push({ name: 'highlight' })
      break
    }
    case 'A': {
      router.push({ name: 'about' })
      break
    }
    default:
      router.push({ name: 'home' })
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;
}

nav {
  font-size: 17px;
}

nav a {
  display: inline-block;
  padding: 5px 10px;
  margin: 10px;
  font-family: 'Roboto';
}

nav a.active-link {
  background-color: green;
  color: #fff;
  text-decoration: none;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
