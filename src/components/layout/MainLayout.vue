<template>
  <div class="main-layout" :class="{ 'no-scroll': isFullscreenPage }">
    <header class="header">
      <nav class="nav-container">
        <div class="logo">
          <img 
            src="https://yh.wanmei.com/images/cover240718/NTE_logo.png" 
            alt="异环 Logo" 
            class="logo-image"
          >
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link" active-class="active">首页</router-link>
          <router-link to="/news" class="nav-link" active-class="active">情报速递</router-link>
          <router-link to="/characters" class="nav-link" active-class="active">角色介绍</router-link>
          <router-link to="/gallery" class="nav-link">都市映像</router-link>
        </div>
        <div class="controls">
          <button 
            ref="audioBtn"
            @click="toggleBGM" 
            class="control-btn" 
            :title="isPlaying ? '关闭音乐' : '播放音乐'"
          >
            <span v-if="isPlaying">🔊</span>
            <span v-else>🔇</span>
          </button>
        </div>
      </nav>
    </header>
    <audio
      ref="audioPlayer"
      preload="auto"
      loop
      src="https://yhvmg.wmupd.com/webops/yh/yh_gw_bgm.mp3"
      style="display: none"
    ></audio>
    <main>
      <slot></slot>
    </main>
    <footer class="footer" v-if="!isFullscreenPage">
      <div class="container footer-content">
        <div class="footer-logo">
          <img 
            src="https://yh.wanmei.com/images/cover240718/NTE_logo.png" 
            alt="异环 Logo" 
            class="logo-image"
          >
          <p class="footer-slogan">AI Generation</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>关于我们</h4>
            <a href="#">游戏介绍</a>
            <a href="#">新闻资讯</a>
            <a href="#">角色展示</a>
          </div>
          <div class="link-group">
            <h4>玩家服务</h4>
            <a href="#">账号注册</a>
            <a href="#">充值中心</a>
            <a href="#">客服中心</a>
          </div>
          <div class="link-group">
            <h4>关注我们</h4>
            <a href="#">微博</a>
            <a href="#">微信</a>
            <a href="#">抖音</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; 2024 米哈游. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const audioBtn = ref<HTMLButtonElement | null>(null)
const hasInteracted = ref(false)
const isFullscreenPage = computed(() => 
  route.name === 'characters' || route.name === 'CityGallery'
)

// 简化音频播放控制
const toggleBGM = async () => {
  if (!audioPlayer.value) return

  try {
    if (isPlaying.value) {
      audioPlayer.value.pause()
      isPlaying.value = false
    } else {
      audioPlayer.value.volume = 1
      await audioPlayer.value.play()
      isPlaying.value = true
      hasInteracted.value = true
    }
  } catch (error) {
    console.error('Failed to toggle audio:', error)
  }
}

// 初始化音频
onMounted(() => {
  if (audioPlayer.value) {
    // 设置音频属性
    audioPlayer.value.preload = 'auto'
    audioPlayer.value.loop = true
    audioPlayer.value.volume = 1
    
    // 监听音频状态
    audioPlayer.value.addEventListener('play', () => {
      isPlaying.value = true
      hasInteracted.value = true
    })
    
    audioPlayer.value.addEventListener('pause', () => {
      isPlaying.value = false
    })
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && isPlaying.value) {
        audioPlayer.value?.pause()
      }
    })

    // 监听用户交互
    const startPlayOnInteraction = () => {
      if (!hasInteracted.value) {
        toggleBGM()
      }
    }

    // 添加用户交互事件监听
    const events = ['click', 'touchstart', 'keydown', 'scroll']
    events.forEach(event => {
      document.addEventListener(event, startPlayOnInteraction)
    })

    // 在组件卸载时移除事件监听
    onUnmounted(() => {
      if (!hasInteracted.value) {
        events.forEach(event => {
          document.removeEventListener(event, startPlayOnInteraction)
        })
      }
    })
  }
})

// 添加滚动隐藏导航栏的功能
let lastScrollY = 0
const handleScroll = () => {
  const header = document.querySelector('.header')
  if (!header) return
  
  const currentScrollY = window.scrollY
  
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.classList.add('hidden')
  } else {
    header.classList.remove('hidden')
  }
  
  lastScrollY = currentScrollY
}

// 监听路由变化，控制滚动条
const updateBodyScroll = () => {
  if (isFullscreenPage.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  updateBodyScroll()
})

// 监听路由变化
watch(isFullscreenPage, updateBodyScroll)

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = '' // 恢复滚动条
})
</script>

<style scoped lang="scss">
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background);
  
  &.no-scroll {
    height: 100vh;
    overflow: hidden;
  }
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(244, 114, 182, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(15, 23, 42, 0.95);
    border-bottom-color: var(--primary-color);
    box-shadow: 0 0 20px rgba(244, 114, 182, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent,
      var(--primary-color),
      transparent
    );
    animation: scanline 2s linear infinite;
  }
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
  position: relative;
  
  .nav-link {
    text-decoration: none;
    color: var(--text-secondary);
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -100%;
      width: 100%;
      height: 2px;
      background: var(--primary-color);
      transition: all 0.5s ease;
      box-shadow: var(--neon-glow);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      right: -100%;
      width: 100%;
      height: 2px;
      background: var(--primary-color);
      transition: all 0.5s ease;
      box-shadow: var(--neon-glow);
    }
    
    &:hover {
      color: var(--primary-color);
      text-shadow: var(--neon-text-glow);
      transform: scale(1.1);
      background: rgba(244, 114, 182, 0.1);
      
      &::before {
        left: 0;
      }
      
      &::after {
        right: 0;
      }
    }
    
    &.active {
      color: var(--primary-color);
      text-shadow: var(--neon-text-glow);
      background: rgba(244, 114, 182, 0.15);
      
      &::before, &::after {
        left: 0;
        right: 0;
      }
    }
  }
}

.logo {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  
  .logo-image {
    height: 40px;
    width: auto;
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 5px rgba(244, 114, 182, 0.3));
    
    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 10px rgba(244, 114, 182, 0.5));
    }
  }
}

.control-btn {
  background: none;
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-secondary);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
    transition: all 0.5s ease;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  
  &:hover {
    color: var(--primary-color);
    text-shadow: var(--neon-text-glow);
    transform: scale(1.2);
    border-color: var(--primary-color);
    box-shadow: var(--neon-glow);
    
    &::before {
      width: 150%;
      height: 150%;
      opacity: 0.3;
    }
  }

  .music-icon {
    width: 24px;
    height: 24px;
    stroke-width: 1.5;
    transition: all 0.3s ease;
  }
  
  &:hover .music-icon {
    stroke: var(--primary-color);
    filter: drop-shadow(0 0 2px var(--primary-color));
  }
}

@keyframes scanline {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes glitch-1 {
  0% {
    clip: rect(20px, 450px, 30px, 0);
  }
  20% {
    clip: rect(44px, 450px, 56px, 0);
  }
  40% {
    clip: rect(12px, 450px, 24px, 0);
  }
  60% {
    clip: rect(48px, 450px, 60px, 0);
  }
  80% {
    clip: rect(32px, 450px, 44px, 0);
  }
  100% {
    clip: rect(28px, 450px, 40px, 0);
  }
}

@keyframes glitch-2 {
  0% {
    clip: rect(12px, 450px, 24px, 0);
  }
  20% {
    clip: rect(48px, 450px, 60px, 0);
  }
  40% {
    clip: rect(32px, 450px, 44px, 0);
  }
  60% {
    clip: rect(28px, 450px, 40px, 0);
  }
  80% {
    clip: rect(20px, 450px, 30px, 0);
  }
  100% {
    clip: rect(44px, 450px, 56px, 0);
  }
}

.footer {
  margin-top: auto;
  background: var(--surface);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 4rem;
  padding: 4rem 1rem;
  max-width: 1440px;
  margin: 0 auto;
}

.footer-logo {
  width: 100%;
  
  .logo-image {
    height: 50px;
    width: auto;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 5px rgba(244, 114, 182, 0.3));
  }
}

.footer-slogan {
  color: var(--text-secondary);
  margin-top: 1rem;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  .link-group {
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--primary-color);
        transition: width 0.3s ease;
      }
      
      &:hover::after {
        width: 100%;
        box-shadow: var(--neon-glow);
      }
    }
    
    a {
      display: block;
      color: var(--text-secondary);
      text-decoration: none;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
      
      &:hover {
        color: var(--primary-color);
        text-shadow: var(--neon-text-glow);
        transform: translateX(5px);
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem 0;
  text-align: center;
  color: var(--text-secondary);
  
  p {
    margin: 0;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  
  .footer-logo {
    text-align: center;
    
    .logo-image {
      height: 40px;
    }
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}

// 滚动效果
@media (min-width: 769px) {
  .header {
    transform: translateY(0);
    transition: transform 0.3s ease, background-color 0.3s ease;
    
    &.hidden {
      transform: translateY(-100%);
    }
  }
}
</style> 