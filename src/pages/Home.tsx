import { TitleBar } from '@/components'
const Home = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleBar />
      <div className="flex-1 px-4 py-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            window.ipcRenderer.send('video-window-create')
          }}
        >
          打开视频
        </button>
      </div>
    </div>
  )
}

export default Home
