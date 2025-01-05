import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoCreateOutline, IoLogIn, IoLogOut } from 'react-icons/io5'
import { useLogout } from '../hooks/useLogout'
import { useGetUser } from '../hooks/useGetUser'

const SlideBar = () => {
    const userIns = JSON.parse(localStorage.getItem('userIns'));
    const { logout, isLoading } = useLogout();
    const { users } = useGetUser();


    return (
        <div className='flex flex-col gap-8 px-4 py-4'>
            <Link to="/" className='flex items-center gap-4'>
                <AiFillHome className='text-2xl' />
                <span>Trang Chủ</span>
            </Link>

            <Link to="/search" className='flex items-center gap-4'>
                <BiSearch className='text-2xl' />
                <span>Tìm kiếm</span>
            </Link>

            <Link to="/create-post" className='flex items-center gap-4'>
                <IoCreateOutline className='text-2xl' />
                <span>Tạo bài viết</span>
            </Link>

            {userIns && userIns.id ? (
                <>
                    {users.filter(user => user._id === userIns.id).map(user => (
                        <>
                            <div className='flex items-center gap-4'>
                                <Link key={user._id} to={`/profile/${user._id}`} className='flex items-center gap-4'>
                                    <img
                                        src={user.profilePicture === "" ? "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg" : user.profilePicture}
                                        alt="profile"
                                        className='w-7 h-7 rounded-full'
                                    />
                                    <span>{user.username}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    disabled={isLoading}
                                    className='text-blue-500 hover:text-blue-700 cursor-pointer'
                                >
                                    {isLoading ? 'Đang đăng xuất...' : <IoLogOut className='text-2xl text-blue-600' />}
                                </button>
                            </div>
                        </>
                    ))}
                </>
            ) : (
                <Link to="/login" className='flex items-center gap-4'>
                    <IoLogIn className='text-2xl' />
                    <span>Đăng nhập</span>
                </Link>
            )}

        </div>
    )
}

export default SlideBar
