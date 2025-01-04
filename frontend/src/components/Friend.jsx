import React from 'react'
import { Link } from 'react-router-dom'

const Friend = ({ user }) => {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
                <img
                    src={user.profilePicture || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <h3 className="font-semibold">{user.username}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </div>
            <button className="px-4 py-2 text-sm font-semibold text-blue-500 hover:text-blue-600">
                <Link to={`/profile/${user._id}`}>Xem thêm</Link>
            </button>
        </div>
    )
}

export default Friend
