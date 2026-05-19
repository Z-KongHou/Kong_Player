import { Outlet } from 'react-router-dom'
import { SideBar } from '../components'

function App() {
  return (
    <div className="flex h-screen bg-white dark:bg-[#18191C] transition-colors duration-[750ms] ease-in-out">
      <SideBar />
      <div className="flex-1 flex flex-col min-h-0">
        <Outlet />
      </div>
    </div>
  )
}

export default App
