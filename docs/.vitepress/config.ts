import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Zanlai's Docs",
  description: "",
  base: '/document/',
  srcDir: './src',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/lottery' },
      { text: '学习笔记', link: '/study-notes' },
      { text: '小说', link: '/novel/1' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'Create lottery-turntable without third-party', link: '/blog/lottery' },
          ]
        }
      ],
      '/novel/': [
        {
          text: '第一部',
          items: [
            { text: '第一章', link: '/novel/1' },
          ]
        }
      ],

    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
