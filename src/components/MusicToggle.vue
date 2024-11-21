<template>
  <button class="music-toggle" @click="toggleMusic" :class="{ 'is-playing': isPlaying }">
    <svg v-if="isPlaying" class="music-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-5c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm-12-5l12-2"/>
    </svg>
    <svg v-else class="music-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-5c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm-12-5l12-2"/>
      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isPlaying = ref(true)

const toggleMusic = () => {
  isPlaying.value = !isPlaying.value
  // 这里可以添加音乐播放/暂停的逻辑
}
</script>

<style scoped lang="scss">
.music-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &.is-playing .music-icon {
    animation: pulse 2s infinite;
  }
}

.music-icon {
  width: 24px;
  height: 24px;
  color: var(--text-primary);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style> 