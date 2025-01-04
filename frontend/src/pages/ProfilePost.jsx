import React from 'react'
import ProfileMenu from '../components/ProfileMenu'
import SlideBar from '../components/SlideBar'
import { useGetPost } from '../hooks/useGetPost';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';
import useUpdatePost from '../hooks/useUpdatePost';

const ProfilePost = () => {
    const { id } = useParams();
    const { posts, isLoading, error } = useGetPost();
    const userIns = JSON.parse(localStorage.getItem('userIns'));
    const { updatePost } = useUpdatePost();

    const handleLike = async (post) => {
        try {
            let updatedLikes;
            if (post.likes.includes(userIns.id)) {
                updatedLikes = post.likes.filter(id => id !== userIns.id);
            } else {
                if (!post.likes.includes(userIns.id)) {
                    updatedLikes = [...new Set([...post.likes, userIns.id])];
                } else {
                    updatedLikes = [...post.likes];
                }
            }

            await updatePost(post._id, { likes: updatedLikes });
        } catch (error) {
            console.error('Error updating like:', error);
        }
    };

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
                                {posts.filter(post => post.userId === id).map((post) => (
                                    <div key={post._id} className="flex justify-center items-center w-full max-w-sm mb-8">
                                        <Card post={post} onLike={() => handleLike(post)} />
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

export default ProfilePost
