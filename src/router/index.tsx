import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import App from '../App'
import About from '@/pages/About'
import LazyLanding from '@/pages/LazyLanding'
import { delay } from '@/utils/delay'

// 带最小延迟的懒加载首页组件
const Home = lazy(async () => {
  // 同时执行组件加载和最小延迟
  const [module] = await Promise.all([
    import('../pages/Home'),
    delay(1000), // 确保至少1秒的加载时间
  ])
  return module
})

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LazyLanding />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])
