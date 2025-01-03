import React from 'react'
import SlideBar from '../components/SlideBar'
import { FaSearch } from 'react-icons/fa'

const Searching = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          {/* Left sidebar */}
          <div className="col-span-2 min-h-[500px] p-4 border-r border-gray-300">
            <SlideBar />
          </div>

          {/* Main content */}
          <div className="col-span-10 min-h-[500px] p-8">
            {/* Search bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm bạn bè..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Friends list */}
            <div className="max-w-2xl mx-auto">
              {/* Friend item */}
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <img
                    src="https://lh3.googleusercontent.com/03WLPin15fkpkLMayBhp4E1YyOJRtcwOL8r2albpcYfmva2vqNbr4RM8q8zk5pGhu9PHdWHk60d2haTOPdgghaUxpDFO4ROPSg=w1600-rj"
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Tên người dùng</h3>
                    <p className="text-sm text-gray-500">Tên hiển thị</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-blue-500 hover:text-blue-600">
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Searching
