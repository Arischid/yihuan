<template>
  <div class="characters">
    <section class="character-section">
      <div class="character-videos">
        <div 
          v-for="(char, idx) in characters" 
          :key="idx"
          class="character-video"
          :class="{ active: currentIndex === idx }"
        >
          <video
            ref="videoRefs"
            autoplay
            loop
            muted
            playsinline
            class="background-video"
            :src="char.video"
            @canplay="handleVideoReady(idx)"
          ></video>
        </div>
      </div>

      <div class="character-title">
        <img
          src="https://yh.wanmei.com/images/cover240718/role_character.png"
          alt="角色介绍"
          class="title-image"
        />
      </div>

      <div class="character-content">
        <div class="character-info">
          <transition name="slide-fade" mode="out-in">
            <div class="character-name" :key="`name-${currentIndex}`">
              <img
                :src="currentCharacter.nameImage"
                :alt="currentCharacter.name"
                class="name-image"
              />
              <img
                :src="currentCharacter.linesImage"
                alt="装饰线"
                class="lines-image"
              />
            </div>
          </transition>
          <transition name="slide-fade" mode="out-in">
            <div class="character-description" :key="`desc-${currentIndex}`">
              <p
                v-for="(line, index) in currentCharacter.description"
                :key="index"
                :style="{ animationDelay: `${index * 0.1}s` }"
                class="description-line"
              >
                {{ line }}
              </p>
            </div>
          </transition>
        </div>

        <div class="character-switcher">
          <button
            v-for="(bullet, index) in bullets"
            :key="index"
            @click="switchCharacter(index)"
            :class="{ active: currentIndex === index }"
            class="bullet-btn"
          >
            <div class="bullet-image-container">
              <img
                :src="bullet"
                :alt="`切换到角色${index + 1}`"
                class="bullet-image"
                :style="{
                  transform:
                    currentIndex === index
                      ? 'translateY(-50%)'
                      : 'translateY(0)',
                }"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";

const bullets = [
  "https://yh.wanmei.com/images/cover240718/role_bullet1.png",
  "https://yh.wanmei.com/images/cover240718/role_bullet2.png",
  "https://yh.wanmei.com/images/cover240718/role_bullet3.png",
];

const characters = [
  {
    name: "薄荷",
    nameImage: "https://yh.wanmei.com/images/cover240718/role1_name.png",
    linesImage: "https://yh.wanmei.com/images/cover240718/role1_lines.png",
    video: "https://yhvmg.wmupd.com/webops/yh/yh_bgv_bohe.mp4",
    description: [
      "异象管理局收容二组预备骨干，同事街坊人名词典，海特洛市平价美食活地图。",
      "从总务处不苟言笑的财务姐姐到员工食堂的手抖大叔，从力小屋的寡言大将到DSD潮玩店的热情导购，都能上前大聊特聊……当然，是工作外的时间！",
      "什么都可以漫天发散，没有她接不住的话题……大概。每期异象管理局收容安全考试的成绩除外。",
    ],
  },
  {
    name: "角色2",
    nameImage: "https://yh.wanmei.com/images/cover240718/role2_name.png",
    linesImage: "https://yh.wanmei.com/images/cover240718/role2_lines.png",
    video: "https://yhvmg.wmupd.com/webops/yh/yh_bgv_nanali.mp4",
    description: [
      "古董店「伊波恩」的一号台柱，桥间地最有名望的家族老大，海特洛市前途无量的异能者之星！",
      "稳重威严，慷慨仁慈，睿智冷静。",
      "曾参与「团三郎的复仇」「棉绒绒魔王对决」「V级暴怒GR云危机」等多起大型异象收容、泯除行动，以一招「柯林斯终极幽魂暗影裂空霆焰魔拳」扫荡四方，从无败绩！",
      "（日结1000方斯一条，括号内的删除。）",
    ],
  },
  {
    name: "角色3",
    nameImage: "https://yh.wanmei.com/images/cover240718/role3_name.png",
    linesImage: "https://yh.wanmei.com/images/cover240718/role3_lines.png",
    video: "https://yhvmg.wmupd.com/webops/yh/yh_bgv_zaowu.mp4",
    description: [
      "「第一，不准鬼郎丸乱喂东西！",
      "第二，不准低头看人！",
      "第三，不准打开冰箱冷藏室第三格！」",
      "早雾，古董店「伊波恩」冰箱便利贴规则制定者—— 虽然到现在，真正遵循的人……咳，屈指可数。",
      "要是惹恼了早雾，记得提防她那把名叫鬼郎丸的异象巨锤，别靠得太近……",
      "「什么东西被吞了，又或者被咬了屁股，伊波恩古董店概不赔付。」",
    ],
  },
];

const currentIndex = ref(0);
const currentCharacter = computed(() => characters[currentIndex.value]);
const videoRefs = ref<HTMLVideoElement[]>([]);
const videoStates = ref(characters.map(() => ({ ready: false })));

const handleVideoReady = (index: number) => {
  videoStates.value[index].ready = true;
};

// 优化视频加载和播放
const loadVideo = (index: number) => {
  if (!videoRefs.value[index]) return
  
  // 使用 requestAnimationFrame 优化视频加载
  requestAnimationFrame(() => {
    const video = videoRefs.value[index]
    if (!video) return

    // 只有未加载的视频才需要重新加载
    if (!videoStates.value[index].ready) {
      video.load()
    }

    if (index === currentIndex.value) {
      // 使用 Promise 处理播放
      video.play().catch(() => {
        console.warn('Video play failed:', index)
      })
    } else {
      video.pause()
      // 将非当前视频定位到开始位置
      video.currentTime = 0
    }
  })
}

// 优化角色切换逻辑
const switchCharacter = (index: number) => {
  if (index === currentIndex.value) return // 避免重复切换
  
  // 使用 requestAnimationFrame 优化 DOM 操作
  requestAnimationFrame(() => {
    // 暂停当前视频
    const currentVideo = videoRefs.value[currentIndex.value]
    if (currentVideo) {
      currentVideo.pause()
      currentVideo.currentTime = 0
    }

    // 更新索引
    currentIndex.value = index

    // 播放新视频
    const newVideo = videoRefs.value[index]
    if (newVideo) {
      newVideo.play().catch(() => {
        console.warn('Video play failed:', index)
      })
    }
  })
}

// 优化初始加载
onMounted(() => {
  // 使用 IntersectionObserver 监测视频可见性
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target as HTMLVideoElement
        const index = videoRefs.value.indexOf(video)
        if (index !== -1) {
          videoStates.value[index].ready = true
          if (index === currentIndex.value) {
            video.play().catch(console.warn)
          }
        }
      }
    })
  }, {
    threshold: 0.1
  })

  // 观察所有视频元素
  videoRefs.value.forEach(video => {
    if (video) {
      observer.observe(video)
    }
  })

  // 组件卸载时清理
  onUnmounted(() => {
    observer.disconnect()
  })
})

// 使用 watch 优化视频状态管理
watch(currentIndex, (newIndex, oldIndex) => {
  if (newIndex === oldIndex) return
  
  // 使用 requestAnimationFrame 优化状态更新
  requestAnimationFrame(() => {
    const videos = document.querySelectorAll('.character-video')
    videos[oldIndex]?.classList.remove('active')
    videos[newIndex]?.classList.add('active')
  })
}, { flush: 'post' })
</script>

<style lang="scss" scoped>
.characters {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: var(--background);
}

.character-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: hidden;
}

.character-videos {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
}

.character-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  overflow: hidden;
  background: transparent;
  will-change: opacity;
  transform: translateZ(0);

  &.active {
    opacity: 1;
  }

  .background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    object-position: center center;
    transform: none !important;
    will-change: transform;
    backface-visibility: hidden;
  }
}

.character-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: calc(2vw + 10px) calc(3vw + 10px) calc(3vw + 10px);
  z-index: 1;
  position: relative;
  margin-top: 80px;
}

.character-info {
  max-width: min(600px, 90vw);
}

.character-title {
  position: fixed;
  top: 100px;
  left: 40px;
  z-index: 3;
  width: auto;

  .title-image {
    width: min(300px, 25vw);
    height: auto;
    filter: drop-shadow(var(--neon-text-glow));
  }
}

.character-name {
  margin-bottom: calc(1vw + 1rem);

  .name-image {
    height: 200px;
    width: auto;
    margin-bottom: calc(0.5vw + 0.5rem);
    filter: drop-shadow(var(--neon-text-glow));
    transition: all 0.3s ease;

    &:hover {
      filter: drop-shadow(var(--neon-text-glow)) brightness(1.2);
      transform: scale(1.05);
    }
  }

  .lines-image {
    height: 80px;
    width: auto;
    opacity: 0.8;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      transform: scale(1.05);
    }
  }
}

.character-description {
  text-align: left;
  color: #afafaf;
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  line-height: calc(1.5em + 0.2vw);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  width: min(1000px, 90vw);

  p {
    margin: 0;
    padding: calc(0.3vw + 2px) 0;
    opacity: 0.9;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      transform: translateX(10px);
    }
  }
}

// 添加窗口大小变化时的平滑过渡
.character-title,
.character-name,
.character-description,
.title-image,
.name-image,
.lines-image {
  transition: all 0.3s ease;
}

// 响应式调整
@media (max-width: 1200px) {
  .character-content {
    padding: calc(1.5vw + 8px) calc(2vw + 8px) calc(2vw + 8px);
  }
}

@media (max-width: 768px) {
  .character-content {
    padding: calc(1vw + 5px) calc(1.5vw + 5px) calc(1.5vw + 5px);
  }

  .character-description {
    font-size: clamp(0.8rem, 2vw, 1rem);
  }

  .character-title {
    top: 80px;
    left: 20px;

    .title-image {
      width: min(200px, 30vw);
    }
  }

  .character-name {
    .name-image {
      height: 40px;
    }
    
    .lines-image {
      height: 15px;
    }
  }
}

@media (max-width: 480px) {
  .character-content {
    padding: 10px 15px;
  }

  .character-description {
    font-size: clamp(0.8rem, 2.5vw, 1rem);
  }
}

[v-motion-slide-visible-once-left] {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &.enter-active {
    opacity: 1;
    transform: translateX(0);
  }

  &.enter-from {
    opacity: 0;
    transform: translateX(-50px);
  }
}

[v-motion-slide-visible-once-top] {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &.enter-active {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  &.enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-50px);
  }
}

.character-switcher {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
}

.bullet-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }

  &.active {
    opacity: 1;
  }
}

.bullet-image-container {
  width: 60px;
  height: 30px;
  overflow: hidden;
  position: relative;
}

.bullet-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
}

// 添加过渡动画
.bullet-image {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.background-video {
  transition: opacity 1s ease;
}

.character-name,
.character-description {
  transition: opacity 0.3s ease;
}

.video-preload,
.preload-video {
  display: none;
}

// 添加滑动淡入效果
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(-50px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

// 修改角色描述行的动画
.description-line {
  opacity: 0;
  transform: translateX(-30px);
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.character-name, .character-description {
  will-change: transform, opacity;
}

// 优化过渡效果
.character-content {
  // ... 其他样式保持不变 ...
  
  .character-info {
    // ... 其他样式保持不变 ...
    
    .character-title,
    .character-name,
    .character-description {
      transform-origin: left center;
    }
  }
}

// 添加淡入效果
.fade-in {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// 优化响应式动画
@media (max-width: 768px) {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-20px);
  }
  
  .description-line {
    transform: translateX(-15px);
  }
}
</style>
