import React from 'react'
import Avatar1 from '../assets/img/FB_IMG_1708595704236.jpg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useGetUser } from '../hooks/useGetUser';

const ProfileMenu = () => {
    const userIns = JSON.parse(localStorage.getItem('userIns'));
    const { users, isLoading, error } = useGetUser();

    if (!users || isLoading) {
        return (
            <div className="bg-base-100 p-4 rounded-box w-64 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <>
            <div className="bg-base-100 p-4 rounded-box w-64">
                {error && <p className='text-red-500 text-center'>{error}</p>}


                {/* Suggested section */}
                <div className="mb-2">
                    <p className="text-sm text-gray-500 mb-2">Gợi ý cho bạn</p>
                    <div className="space-y-3">
                        {/* Suggested User Item */}
                        {users.filter(user => !userIns || user._id !== userIns.id).map((user, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full">
                                            <img src={user.profilePicture || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{user.username}</p>

                                    </div>
                                </div>
                                <button className="text-blue-500 text-sm">
                                    <Link to={`/profile/${user._id}`}>Xem thêm</Link>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* See All link */}
                <div className="text-center">
                    <Link to="/search" className="text-sm text-gray-600">Xem thêm</Link>
                </div>
            </div>
        </>
    )
}

export default ProfileMenu
