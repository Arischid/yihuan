<template>
  <div class="city-gallery">
    <section class="gallery-content">
      <div class="container">
        <div class="gallery-slider">
          <!-- 轮播内容 -->
          <div class="gallery-slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <article class="gallery-item" v-for="(city, index) in cities" :key="index">
              <div class="gallery-image">
                <img :src="city.image" :alt="city.name">
                <div class="gallery-title">
                  <img :src="city.titleImage" :alt="city.name + '标题'" class="title-image">
                </div>
              </div>
              <div class="gallery-text">
                <h2>{{ city.name }}</h2>
                <p>{{ city.description }}</p>
              </div>
            </article>
          </div>

          <!-- 轮播控制按钮 -->
          <button class="slider-btn prev" @click="prevSlide">
            <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="slider-btn next" @click="nextSlide">
            <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- 轮播指示器 -->
          <div class="slider-dots">
            <button 
              v-for="(_, index) in cities" 
              :key="index"
              class="dot"
              :class="{ active: currentIndex === index }"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cities = [
  {
    name: '海特洛市',
    image: 'https://yh.wanmei.com/images/cover240718/NTE_features1.jpg',
    titleImage: 'https://yh.wanmei.com/images/cover240718/citySlide1Tit.png',
    description: '这座充满未来感的城市中，科技与人文交织，创造出独特的都市魅力。霓虹灯光与现代建筑相映成辉，勾勒出一幅令人向往的都市画卷。'
  },
  {
    name: '新城区',
    image: 'https://yh.wanmei.com/images/cover240718/NTE_features2.jpg',
    titleImage: 'https://yh.wanmei.com/images/cover240718/citySlide2Tit.png',
    description: '繁华的新城区是城市发展的缩影，高耸入云的摩天大楼与充满活力的街区相得益彰。这里是梦想与机遇的交汇点，每个角落都蕴含着无限可能。'
  },
  {
    name: '商业街区',
    image: 'https://yh.wanmei.com/images/cover240718/NTE_features3.jpg',
    titleImage: 'https://yh.wanmei.com/images/cover240718/citySlide3Tit.png',
    description: '灯火通明的商业街区是城市的活力中心，各式店铺与餐厅汇聚于此。街道上霓虹闪烁，人来人往，展现着都市的繁华与热闹。'
  },
  {
    name: '中央广场',
    image: 'https://yh.wanmei.com/images/cover240718/NTE_features4.jpg',
    titleImage: 'https://yh.wanmei.com/images/cover240718/citySlide4Tit.png',
    description: '城市的心脏地带，宏伟的建筑群环绕着开阔的广场。这里是市民休闲娱乐的首选之地，也是举办重要活动的核心场所。'
  },
  {
    name: '科技园区',
    image: 'https://yh.wanmei.com/images/cover240718/NTE_features5.jpg',
    titleImage: 'https://yh.wanmei.com/images/cover240718/citySlide5Tit.png',
    description: '未来科技的发源地，林立的研究设施与实验室构成了这片充满创新气息的园区。这里孕育着改变世界的新技术，是城市发展的重要引擎。'
  }
]

const currentIndex = ref(0)

const nextSlide = () => {
  if (currentIndex.value >= cities.length - 1) {
    // 到达最后一张时，平滑过渡到第一张
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value <= 0) {
    // 在第一张时，平滑过渡到最后一张
    currentIndex.value = cities.length - 1
  } else {
    currentIndex.value--
  }
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}
</script>

<style lang="scss" scoped>
.city-gallery {
  min-height: 100vh;
  height: 100vh;
  background: var(--background);
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.gallery-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
}

.container {
  flex: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
}

.gallery-slider {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gallery-slides {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  height: 100%;
}

.gallery-item {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.gallery-image {
  position: relative;
  height: 65vh;
  min-height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .gallery-title {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    padding: 2rem;
    text-align: center;
    
    .title-image {
      max-width: 500px;
      width: 100%;
      filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    }
  }
}

.gallery-text {
  padding: 2rem;
  text-align: center;
  background: var(--surface);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    text-shadow: var(--neon-text-glow);
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
  }
}

// 轮播控制按钮样式
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border: none;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  z-index: 10;

  .arrow-icon {
    width: 32px;
    height: 32px;
    color: white;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(var(--primary-color-rgb), 0.8);
    box-shadow: 0 0 15px rgba(var(--primary-color-rgb), 0.5);

    .arrow-icon {
      transform: scale(1.2);
    }
  }

  &.prev {
    left: 20px;
    &:hover .arrow-icon {
      transform: scale(1.2) translateX(-2px);
    }
  }

  &.next {
    right: 20px;
    &:hover .arrow-icon {
      transform: scale(1.2) translateX(2px);
    }
  }
}

// 轮播指示器样式
.slider-dots {
  position: absolute;
  bottom: 320px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.8rem;
  z-index: 10;
  padding: 0.8rem;
  border-radius: 1rem;

  .dot {
    width: 40px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: white;
      width: 60px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }

    &:hover:not(.active) {
      background: rgba(255, 255, 255, 0.5);
      width: 50px;
    }
  }
}

@media (max-width: 768px) {
  .city-gallery {
    height: 100vh;
    overflow: hidden;
  }
  
  .gallery-item {
    .gallery-image {
      height: 50vh;
      min-height: 300px;
      
      .gallery-title {
        bottom: 40px;
        padding: 1rem;
        
        .title-image {
          max-width: 280px;
        }
      }
    }
    
    .gallery-text {
      padding: 1.5rem;
      
      h2 {
        font-size: 1.5rem;
      }
      
      p {
        font-size: 1rem;
      }
    }
  }

  .slider-btn {
    width: 40px;
    height: 40px;

    .arrow-icon {
      width: 24px;
      height: 24px;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }

  .slider-dots {
    bottom: 40px;
    gap: 0.5rem;
    
    .dot {
      width: 30px;
      height: 3px;
      
      &.active {
        width: 45px;
      }
      
      &:hover:not(.active) {
        width: 35px;
      }
    }
  }
}
</style> 