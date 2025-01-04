import React, { useEffect, useState } from 'react'
import SlideBar from '../components/SlideBar'
import { Link, useParams } from 'react-router-dom';
import { useGetUser } from '../hooks/useGetUser';
import { useGetPost } from '../hooks/useGetPost';
import useUpdateUser from '../hooks/useUpdateUser.js';

const Profile = () => {
    const { id } = useParams();
    const userIns = JSON.parse(localStorage.getItem('userIns'));
    const { users, isLoading, error } = useGetUser();
    const { posts, isLoading: isLoadingPosts, error: errorPosts } = useGetPost();
    const user = users.find((user) => user._id === id);
    const [idUserCurrent, setIdUserCurrent] = useState(null);
    const { updateUser } = useUpdateUser();
    const [isUpdating, setIsUpdating] = useState(false);

    const [formUser, setFormUser] = useState({
        username: '',
        email: '',
        profilePicture: '',
        bio: ''
    });


    const handleEdit = (userData) => {
        document.getElementById('my_modal_4').showModal();
        setIdUserCurrent(userData._id);
        setFormUser(userData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formUser);
        if (Object.keys(errors).length > 0) {
            return alert(errors.username || errors.email);
        }

        setIsUpdating(true);
        try {
            await updateUser(idUserCurrent, formUser);
            document.getElementById('my_modal_4').close();
        } catch (error) {
            alert(error);
        } finally {
            setIsUpdating(false);
        }
    }

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.username) errors.username = 'Username bắt buộc không bỏ trống';
        if (!formData.email) errors.email = 'Email bắt buộc không bỏ trống';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Email không đúng định dạng';
        }
        return errors;
    };

    if (isLoading || isLoadingPosts) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if (error || errorPosts) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error || errorPosts}</div>
    }




    return (
        <>

            <div>
                <div className="container mx-auto">
                    <div className="grid grid-cols-12">
                        {/* Left sidebar */}
                        <div className="col-span-2 min-h-[500px] p-4 border-r border-gray-300">
                            <SlideBar />
                        </div>

                        {/* Main content */}
                        <div className="col-span-10 min-h-[500px] p-28">

                            {!user ? (
                                <div className="flex justify-center items-center min-h-screen">User not found</div>
                            ) : (
                                <>
                                    {/* Profile Header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={user.profilePicture || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"}
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full"
                                            />
                                            <div>
                                                <h1 className="text-2xl font-bold">{user?.username || "Unknown"}</h1>
                                                <div className="flex gap-4 text-gray-600 mt-2">
                                                    <span>{posts.filter(post => post.userId === id).length} Posts</span>
                                                </div>
                                                <p className="mt-2">{user.bio || "No bio"}</p>
                                            </div>
                                        </div>
                                        {userIns?.id === user?._id ? (
                                            <button className="text-2xl w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors" onClick={() => handleEdit(user)}>⋮</button>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    {/* Navigation */}
                                    <div className="border-t border-gray-300 mb-8">
                                        <div className="flex gap-8 justify-start py-4">
                                            <button className="font-medium">POSTS</button>
                                        </div>
                                    </div>

                                    {/* Image Grid */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {posts.filter(post => post.userId === id).length === 0 ? (
                                            <div className="col-span-3 flex justify-center items-center h-[300px] ">
                                                <p className="text-center">Chưa có bài post nào</p>
                                            </div>
                                        ) : (

                                            posts.filter(post => post.userId === id).map((post) => (
                                                <Link to={`/profile-post/${id}`}>
                                                    <img
                                                        key={post._id}
                                                        src={post.image}
                                                        alt={post.caption}
                                                        className="w-full h-[300px] object-cover"
                                                    />
                                                </Link>
                                            ))
                                        )}


                                        {/* <img
                                            src="https://rollingstoneindia.com/wp-content/uploads/2023/10/Doona-Scene-Suzy-2-Netflix.jpg"
                                            alt="Post 1"
                                            className="w-full h-[300px] object-cover"
                                        />
                                        <img
                                            src="https://i.pinimg.com/originals/a4/5f/04/a45f040de71445e5ad1c15cc99b3d9a1.jpg"
                                            alt="Post 2"
                                            className="w-full h-[300px] object-cover"
                                        />
                                        <img
                                            src="https://media.viez.vn/prod/2022/2/10/large_6fc254b41e76fd00df453162db703819_1621520415675683565065_848b543dac.jpeg"
                                            alt="Post 3"
                                            className="w-full h-[300px] object-cover"
                                        /> */}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg">Chỉnh sửa thông tin</h3>
                    <p className="py-4">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    value={formUser.username}
                                    onChange={(e) => setFormUser({ ...formUser, username: e.target.value })}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full mt-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={formUser.email}
                                    onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full mt-4">
                                <label className="label">
                                    <span className="label-text">Profile Picture URL</span>
                                </label>
                                <input
                                    type="text"
                                    value={formUser.profilePicture}
                                    onChange={(e) => setFormUser({ ...formUser, profilePicture: e.target.value })}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full mt-4">
                                <label className="label">
                                    <span className="label-text">Bio</span>
                                </label>
                                <textarea
                                    value={formUser.bio}
                                    onChange={(e) => setFormUser({ ...formUser, bio: e.target.value })}
                                    className="textarea textarea-bordered h-24"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Sửa</button>
                            </div>
                        </form>
                    </p>
                    <div className="modal-action">
                        <form method="dialog" >
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_4').close()}>✕</button>
                            <button className="btn" type="button" onClick={() => document.getElementById('my_modal_4').close()}>Thoát</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Profile
