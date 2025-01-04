import React, { useState } from 'react'
import SlideBar from '../components/SlideBar'
import { FaSearch } from 'react-icons/fa'
import Friend from '../components/Friend'
import { useGetUser } from '../hooks/useGetUser'

const Searching = () => {
  const { users, isLoading, error } = useGetUser();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500 text-center">{error}</p>
    </div>
  }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Friends list */}
            <div className="max-w-2xl mx-auto">
                {filteredUsers.map((user, index) => (
                    <Friend key={index} user={user} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Searching
