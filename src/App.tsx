import { Outlet } from 'react-router-dom'
import { SideBar } from './components'

function App() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  )
}

export default App
