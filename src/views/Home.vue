<template>
  <div class="home" :class="{ 'loading': !videoReady }">
    <div class="loading-overlay" v-if="!videoReady">
      <div class="loading-indicator">Loading...</div>
    </div>

    <!-- Hero Section -->
    <section class="hero" v-show="videoReady">
      <div class="hero-content">
        <h1 class="hero-title" v-motion-slide-visible-once-bottom>
          探索无尽的冒险世界
        </h1>
        <p class="hero-subtitle" v-motion-slide-visible-once-bottom>
          加入数百万玩家的行列，开启你的传奇之旅
        </p>
        <div class="hero-buttons" v-motion-slide-visible-once-bottom>
          <a 
            href="https://yh.wanmei.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-primary"
          >
            立即下载
          </a>
          <a 
            href="https://yh.wanmei.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-secondary"
          >
            观看视频
          </a>
        </div>
      </div>
      <div class="hero-video">
        <video 
          ref="heroVideo"
          autoplay 
          loop 
          muted 
          playsinline 
          class="background-video"
          :style="{ opacity: videoReady ? 1 : 0 }"
          @canplay="handleVideoReady"
        >
          <source src="https://yhvmg.wmupd.com/webops/yh/yh_bgv_20240704.mp4" type="video/mp4">
        </video>
        <!-- 加载指示器 -->
        <div class="video-overlay" :style="{ opacity: videoReady ? 0 : 1 }">
          <div class="loading-indicator">Loading...</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" v-show="videoReady">
      <div class="container">
        <h2 class="section-title" v-motion-slide-visible-once-bottom>
          游戏特色
        </h2>
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card"
            v-motion-slide-visible-once-bottom
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="feature-icon">
              <component :is="feature.icon" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="latest-news" v-show="videoReady">
      <div class="container">
        <h2 class="section-title" v-motion-slide-visible-once-bottom>
          最新动态
        </h2>
        <div class="news-grid">
          <article 
            v-for="(news, index) in latestNews" 
            :key="index"
            class="news-card"
            v-motion-slide-visible-once-bottom
          >
            <img :src="news.image" :alt="news.title">
            <div class="news-content">
              <span class="news-date">{{ news.date }}</span>
              <h3>{{ news.title }}</h3>
              <p>{{ news.excerpt }}</p>
              <router-link :to="news.link" class="read-more">
                阅读更多
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  SparklesIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon 
} from '@heroicons/vue/24/outline'

const features = ref([
  {
    icon: SparklesIcon,
    title: '震撼画面',
    description: '采用最新虚幻引擎5技术，带来极致视觉体验'
  },
  {
    icon: UserGroupIcon,
    title: '多人冒险',
    description: '与好友组队探索广阔世界，共同完成史诗任务'
  },
  {
    icon: GlobeAltIcon,
    title: '开放世界',
    description: '自由探索vast大陆，发现隐藏的秘密与宝藏'
  },
  {
    icon: ShieldCheckIcon,
    title: '独特玩法',
    description: '创新的战斗系统，让每场战斗都充满策略'
  }
])

const latestNews = [
  {
    title: '《异环》「奇点测试」定档11.28 超自然都市轻喜剧即将放送！',
    date: '2024-11-12',
    image: 'https://yh.wanmei.com/resources/jpg/20241112/114317313727441880.jpg',
    excerpt: '由Hotta Studio自主研发，超自然都市开放世界RPG《异环》「奇点测试」将于11月28日开启！',
    link: '/news/1'
  },
  {
    title: '《异环》「奇点测试」定档11.28 超自然都市轻喜剧即将放送！',
    date: '2024-07-18',
    image: 'https://yh.wanmei.com/images/cover240718/intelSlide1.jpg',
    excerpt: '《异环》是Hotta Studio自主研发的超自然都市���放世界RPG。故事将从海特洛市启篇...',
    link: '/news/2'
  }
]

// 预加载视频列表
const characterVideos = [
  'https://yhvmg.wmupd.com/webops/yh/yh_bgv_bohe.mp4',
  'https://yhvmg.wmupd.com/webops/yh/yh_bgv_nanali.mp4',
  'https://yhvmg.wmupd.com/webops/yh/yh_bgv_zaowu.mp4'
]

const heroVideo = ref<HTMLVideoElement | null>(null)
const videoReady = ref(false)

const handleVideoReady = () => {
  videoReady.value = true
}

// 优化视频预加载
const preloadCharacterVideos = () => {
  const preloadLink = document.createElement('link')
  preloadLink.rel = 'preload'
  preloadLink.as = 'video'
  preloadLink.href = 'https://yhvmg.wmupd.com/webops/yh/yh_bgv_bohe.mp4'
  document.head.appendChild(preloadLink)
}

onMounted(() => {
  // 使用 requestIdleCallback 在浏览器空闲时预加载
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadCharacterVideos)
  } else {
    setTimeout(preloadCharacterVideos, 1000)
  }
})
</script>

<style scoped lang="scss">
.home {
  overflow: hidden;
  width: 100%;
}

.hero {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
  margin: 0 auto;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  
  .background-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    
    @media (min-aspect-ratio: 16/9) {
      width: 100%;
      height: auto;
    }
    
    @media (max-aspect-ratio: 16/9) {
      width: auto;
      height: 100%;
    }
    transition: opacity 0.5s ease;
  }
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  animation: textGlow 2s infinite;
  
  @media (max-width: 768px) {
    font-size: 2rem !important;
    margin-bottom: 1rem;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.2rem !important;
    margin-bottom: 1.5rem;
  }
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  .btn-primary, .btn-secondary {
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    
    button {
      width: 100%;
    }
  }
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    box-shadow: var(--neon-glow);
  }
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.features {
  padding: 6rem 0;
  background: var(--surface);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  color: var(--text-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 1rem;
  background: var(--surface);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation-delay: var(--delay);
  
  &:hover {
    transform: translateY(-5px);
    animation: glowingBorder 2s infinite;
    background: #2d3748;
  }

  h3 {
    margin: 1rem 0;
    font-size: 1.5rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    color: var(--primary-color);
  }
}

.latest-news {
  padding: 6rem 0;
  background: var(--background);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.news-card {
  background: var(--surface);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: #2d3748;
  }

  .news-content {
    padding: 1.5rem;

    h3 {
      margin: 0.5rem 0;
      font-size: 1.25rem;
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
    }
  }

  .news-date {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .read-more {
    display: inline-block;
    margin-top: 1rem;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
      animation: textGlow 2s infinite;
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 添加滚动动画
[v-motion-slide-visible-once-bottom] {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.enter-active {
    opacity: 1;
    transform: translateY(0);
  }
  
  &.enter-from {
    opacity: 0;
    transform: translateY(50px);
  }
}

.video-preload {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: -1;
}

.preload-video {
  width: 1px;
  height: 1px;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease;
  z-index: 2;
}

.loading-indicator {
  color: white;
  font-size: 1.2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-indicator {
  color: var(--primary-color);
  font-size: 1.5rem;
  text-shadow: var(--neon-text-glow);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}
</style> 