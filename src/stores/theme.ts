import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const initDarkTheme = () => {
    document.documentElement.classList.add('dark')
  }

  initDarkTheme()

  return {}
}) 