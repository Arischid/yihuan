<template>
  <div class="news-detail">
    <div class="news-header">
      <div class="image-container">
        <img 
          :src="currentNews.image" 
          :alt="currentNews.title"
          class="news-image"
        >
      </div>
    </div>
    <div class="news-content container">
      <h1 class="news-title">{{ currentNews.title }}</h1>
      <div class="news-meta">
        <span class="news-date">{{ formatDate(currentNews.date) }}</span>
        <span class="news-category">{{ getCategoryName(currentNews.category) }}</span>
      </div>
      <div class="news-body">
        <p>{{ currentNews.content || currentNews.excerpt }}</p>
      </div>
      <router-link to="/news" class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        返回新闻列表
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const newsData = {
  '3': {
    title: '《异环》「奇点测试」定档11.28 超自然都市轻喜剧即将放送！',
    date: '2024-11-12',
    category: 'announcement',
    image: 'https://yh.wanmei.com/resources/jpg/20241112/114317313727441880.jpg',
    content: '由Hotta Studio自主研发，超自然都市开放世界RPG《异环》「奇点测试」将于11月28日开启！'
  },
  '2': {
    title: '《异环》「奇点测试」招募开启 大都市新PV正在放送！',
    date: '2024-09-26',
    category: 'announcement',
    image: 'https://yh.wanmei.com/resources/jpg/20240925/114317272555415270.jpg',
    content: '超自然开放世界RPG《异环》首次测试即将开启，测试资格招募现已开放！'
  },
  '1': {
    title: '《异环》全新角色「南离」预告片发布',
    date: '2024-07-18',
    category: 'update',
    image: 'https://yh.wanmei.com/images/cover240718/intelSlide1.jpg',
    content: '《异环》是Hotta Studio自主研发的超自然都市开放世界RPG。故事将从海特洛市启篇，作为首位「无证上岗」的「异象猎人」，你将成为经营不善、接取民间异象委托维持周转的古董店「伊波恩」的一员，与个性迥异、能力非凡的伙伴们一起探索各城市的大小谜团，历经有笑有泪的各式奇遇，演绎独属于你们的都市物语。'
  }
}

const currentNews = computed(() => newsData[route.params.id as string] || newsData['1'])

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const getCategoryName = (categoryId: string) => {
  const categories = {
    'update': '更新',
    'event': '活动',
    'announcement': '公告'
  }
  return categories[categoryId as keyof typeof categories] || '新闻'
}
</script>

<style scoped lang="scss">
.news-detail {
  padding-top: 80px;
  min-height: 100vh;
  background: var(--background);
}

.news-header {
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  
  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.7)
      );
      z-index: 1;
    }
  }
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: all 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
}

.news-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  background: var(--surface);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: -4rem;
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
}

.news-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: var(--text-primary);
  text-shadow: var(--neon-text-glow);
  
  &:hover {
    color: var(--primary-color);
  }
}

.news-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  span {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    background: var(--surface-light);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    
    &:hover {
      background: var(--primary-color);
      color: white;
      border-color: transparent;
    }
  }
}

.news-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-primary);
  
  p {
    margin-bottom: 1.5rem;
  }
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  .icon {
    width: 1.2rem;
    height: 1.2rem;
  }
  
  &:hover {
    color: var(--primary-color);
    transform: translateX(-5px);
    
    .icon {
      animation: slideLeft 1s infinite;
    }
  }
}

@keyframes slideLeft {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
}

@media (max-width: 768px) {
  .news-header {
    height: 300px;
  }
  
  .news-content {
    margin-top: -3rem;
    padding: 1.5rem 1rem;
  }
  
  .news-title {
    font-size: 1.8rem;
  }
  
  .news-meta {
    flex-wrap: wrap;
  }
}
</style> 