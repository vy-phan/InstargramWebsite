import React, { useState } from 'react'
import ProfileMenu from '../components/ProfileMenu'
import SlideBar from '../components/SlideBar'
import { useGetPost } from '../hooks/useGetPost';
import Card from '../components/Card'; // Make sure you are importing the updated Card component
import { useParams } from 'react-router-dom';
import useUpdatePost from '../hooks/useUpdatePost';
import useDeletePost from '../hooks/useDeletePost';

const ProfilePost = () => {
    const { id } = useParams();
    const { posts, isLoading, error } = useGetPost();
    const userIns = JSON.parse(localStorage.getItem('userIns'));
    const { updatePost } = useUpdatePost();
    const  { deletePost } = useDeletePost();
    const [isDeletingPost, setIsDeletingPost] = useState(false);
    const [deletingPostId, setDeletingPostId] = useState(null); // To track which post is being deleted

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

    const handleDeletePost = async (postId) => {
        setIsDeletingPost(true);
        setDeletingPostId(postId); // Set the ID of the post being deleted
        try {
            await deletePost(postId);
            // After successful deletion, you might want to refresh the posts or update the state to remove the deleted post.
            // For simplicity, we'll just reload the page for now, or you can refetch posts using useGetPost again.
            window.location.reload(); // Simple page reload to refresh posts - or refetch posts
            alert('Bài viết đã được xóa thành công!');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Không thể xóa bài viết: ' + error);
        } finally {
            setIsDeletingPost(false);
            setDeletingPostId(null); // Reset deleting post ID
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
                                {posts
                                    .filter(post => post.userId === id)
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map((post) => (
                                        <div key={post._id} className="flex justify-center items-center w-full max-w-sm mb-8">
                                            <Card
                                                post={post}
                                                onLike={() => handleLike(post)}
                                                onDelete={() => handleDeletePost(post._id)} // Pass the delete handler
                                                isDeleting={isDeletingPost && deletingPostId === post._id} // Pass the deleting state
                                                isCurrentUserPost={userIns?.id === post.userId} // Pass info if it's current user's post
                                            />
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