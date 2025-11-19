import { TitleBar } from '@/components'
const Home = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleBar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-2xl text-white bg-[#000000] p-8 rounded-lg shadow-md">
          Welcome to Kong Player
        </div>
      </div>
    </div>
  )
}

export default Home
