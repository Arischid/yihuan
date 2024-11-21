<template>
  <div class="news-page">
    <section class="news-hero">
      <div class="hero-content">
        <h1 class="page-title" v-motion-slide-visible-once-bottom>
          游戏新闻
        </h1>
        <p class="page-subtitle" v-motion-slide-visible-once-bottom>
          了解《异环》的最新动态与更新信息
        </p>
      </div>
    </section>

    <section class="news-content">
      <div class="container">
        <div class="news-filters" v-motion-slide-visible-once-bottom>
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['filter-btn', { active: currentCategory === category.id }]"
            @click="currentCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>

        <div class="news-grid">
          <article 
            v-for="news in filteredNews" 
            :key="news.id"
            class="news-card"
            v-motion-slide-visible-once-bottom
          >
            <div class="news-image">
              <img :src="news.image" :alt="news.title">
              <span class="news-category">{{ getCategoryName(news.category) }}</span>
            </div>
            <div class="news-content">
              <span class="news-date">{{ formatDate(news.date) }}</span>
              <h2>{{ news.title }}</h2>
              <p>{{ news.excerpt }}</p>
              <router-link :to="`/news/${news.id}`" class="read-more">
                阅读更多
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </article>
        </div>

        <div class="pagination" v-if="totalPages > 1">
          <button 
            class="pagination-btn"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            上一页
          </button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button 
            class="pagination-btn"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            下一页
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const categories = [
  { id: 'all', name: '全部' },
  { id: 'update', name: '更新' },
  { id: 'event', name: '活动' },
  { id: 'announcement', name: '公告' }
]

const currentCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 9

const newsData = [
{
    id: 3,
    title: '《异环》「奇点测试」定档11.28 超自然都市轻喜剧即将放送！',
    date: '2024-11-12',
    category: 'announcement',
    image: 'https://yh.wanmei.com/resources/jpg/20241112/114317313727441880.jpg',
    excerpt: '由Hotta Studio自主研发，超自然都市开放世界RPG《异环》「奇点测试」将于11月28日开启！'
  },
  {
    id: 2,
    title: '《异环》「奇点测试」招募开启 大都市新PV正在放送！',
    date: '2024-09-26',
    category: 'announcement',
    image: 'https://yh.wanmei.com/resources/jpg/20240925/114317272555415270.jpg',
    excerpt: '超自然开放世界RPG《异环》首次测试即将开启，测试资格招募现已开放！'
  },
  {
    id: 1,
    title: '《异环》全新角色「南离」预告片发布',
    date: '2024-07-18',
    category: 'update',
    image: 'https://yh.wanmei.com/images/cover240718/intelSlide1.jpg',
    excerpt: '《异环》是Hotta Studio自主研发的超自然都市开放世界RPG。故事将从海特洛市启篇...'
  }
]

const filteredNews = computed(() => {
  let filtered = newsData
  if (currentCategory.value !== 'all') {
    filtered = newsData.filter(news => news.category === currentCategory.value)
  }
  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / itemsPerPage)
})

const getCategoryName = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : ''
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style lang="scss" scoped>
.news-page {
  min-height: 100vh;
  background: var(--background);
}

.news-hero {
  position: relative;
  height: 40vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
              url('https://yh.wanmei.com/images/cover240718/intelInterludeBridge.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  // 添加霓虹青色光晕效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(64, 224, 208, 0.2),  // 霓虹青色
      transparent 70%
    );
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  .page-title {
    color: var(--text-primary);
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(64, 224, 208, 0.8); // 霓虹文字效果
  }

  .page-subtitle {
    color: var(--text-secondary);
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 0 0 5px rgba(64, 224, 208, 0.6); // 霓虹文字效果
  }
}

.news-content {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.news-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover, &.active {
    background: var(--primary-color);
    color: white;
  }
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.news-card {
  background: var(--surface);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
  }

  .news-image {
    position: relative;
    height: 200px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .news-category {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--primary-color);
      color: white;
      padding: 0.3rem 1rem;
      border-radius: 50px;
      font-size: 0.9rem;
    }
  }

  .news-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 4rem;
    
    .news-date {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-size: 1.25rem;
      margin: 0.5rem 0;
      color: var(--text-primary);
      line-height: 1.4;
    }

    p {
      color: var(--text-secondary);
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .read-more {
      position: absolute;
      bottom: 1.5rem;
      left: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      
      .icon {
        width: 1.2rem;
        height: 1.2rem;
        transition: transform 0.3s ease;
      }
      
      &:hover {
        color: var(--primary-color-hover);
        transform: translateX(5px);
        
        .icon {
          transform: translateX(3px);
        }
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: var(--primary-color);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.page-info {
  color: var(--text-primary);
}
</style> 