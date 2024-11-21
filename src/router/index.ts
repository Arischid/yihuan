import { createRouter, createWebHistory } from 'vue-router'

import News from '../views/News.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      name: 'home'
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/news/:id',
      component: () => import(/* webpackChunkName: "news-detail" */ '../views/NewsDetail.vue'),
      name: 'news-detail'
    },
    {
      path: '/characters',
      component: () => import(/* webpackChunkName: "characters" */ '../views/Characters.vue'),
      name: 'characters'
    },
    {
      path: '/gallery',
      name: 'CityGallery',
      component: () => import('../views/CityGallery.vue')
    }
  ],
  // 添加滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（比如用户点击了浏览器的后退按钮）
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

// 使用 IntersectionObserver 优化预加载
const setupPrefetch = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement
        const route = link.getAttribute('href')
        if (route === '/characters') {
          import(/* webpackPrefetch: true */ '../views/Characters.vue')
        } else if (route === '/') {
          import(/* webpackPrefetch: true */ '../views/Home.vue')
        }
        observer.unobserve(entry.target)
      }
    })
  }, {
    rootMargin: '50px' // 提前50px开始观察
  })

  // 观察导航链接
  setTimeout(() => {
    document.querySelectorAll('a[href="/characters"], a[href="/"]').forEach(link => {
      observer.observe(link)
    })
  }, 1000) // 延迟1秒等待DOM加载完成
}

router.beforeEach((to, from, next) => {
  // 只在首次访问时设置预加载观察
  if (!router.hasObserved) {
    router.hasObserved = true
    setupPrefetch()
  }
  next()
})

export default router 