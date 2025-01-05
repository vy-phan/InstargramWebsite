import React from 'react'
import Header from '../components/Header'
import ProfileMenu from '../components/ProfileMenu'
import Card from '../components/Card.jsx'
import SlideBar from '../components/SlideBar'
import { useGetPost } from '../hooks/useGetPost'


const Home = () => {
  const { posts, isLoading, error } = useGetPost();


  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          {/* Left sidebar */}
          <div className="col-span-2  min-h-[500px] p-4 border-r border-gray-300">
            <SlideBar />
          </div>


          {/* Main content */}
          <div className="col-span-8 bg-white min-h-[500px] p-4 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
              <div className="flex flex-wrap justify-center items-center gap-4">
                {posts
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((post) => (
                    <div key={post._id} className="flex justify-center items-center w-full max-w-sm mb-8">
                      <Card post={post} />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-2  min-h-[500px] p-4 border-l border-gray-300">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home