import React from 'react'
import { useGetUser } from '../hooks/useGetUser'
import { formatDate } from '../utils/dataFomat'
import useUpdatePost from '../hooks/useUpdatePost';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri'; // Import delete icon

const Card = ({ post, onDelete, isDeleting, isCurrentUserPost }) => {
    const { users, isLoading, error } = useGetUser();
    const userIns = JSON.parse(localStorage.getItem('userIns'));
    const [isLiked, setIsLiked] = React.useState(userIns ? post.likes.includes(userIns.id) : false);
    const { updatePost } = useUpdatePost()

    const handleLike = async () => {
        if (!userIns) {
            alert("Vui lòng đăng nhập để thực hiện chức năng này!");
            return;
        }

        try {
            let updatedLikes;
            if (isLiked) {
                updatedLikes = post.likes.filter(id => id !== userIns.id);
            } else {
                if (!post.likes.includes(userIns.id)) {
                    updatedLikes = [...new Set([...post.likes, userIns.id])];
                } else {
                    updatedLikes = [...post.likes];
                }
            }

            await updatePost(post._id, { likes: updatedLikes });
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error updating like:', error);
        }
    };

    if (!post) {
        return null;
    }

    if (isLoading ) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                {/* <Link to={`/profile/${post.userId}`}> */}
                    <img
                        src={post.image || <div className="skeleton h-32 w-32"></div>}
                        alt="Post image"
                        className="w-full h-auto object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://media.vov.vn/sites/default/files/styles/large/public/2023-09/4_47.jpg'; // Fallback image
                    }}
                />
                {/* </Link> */}
            </figure>

            <div className="card-body p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="avatar">
                            <div className="w-8 h-8 rounded-full">
                                <Link to={`/profile/${post.userId}`}>
                                    <img
                                        src={users.find(user => user._id === post.userId)?.profilePicture || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg'}
                                        alt="user avatar"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/32';
                                    }}
                                />
                                </Link>
                            </div>
                        </div>
                        <span className="font-bold">{users.find(user => user._id === post.userId)?.username || 'Unknown User'}</span>
                        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>{post.likes.length} likes </p>
                    </div>
                </div>
                <p>{post.caption}</p>

                <div className="card-actions justify-start mt-4">
                    <button
                        className={`btn btn-ghost btn-circle ${!userIns ? 'cursor-not-allowed opacity-50' : ''}`}
                        onClick={handleLike}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill={isLiked ? "red" : "none"}
                            viewBox="0 0 24 24"
                            stroke={isLiked ? "red" : "currentColor"}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                    <button
                        className="btn btn-ghost btn-circle"
                        onClick={()=>document.getElementById(`comment_modal_${post._id}`).showModal()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>
                    {/* Conditionally render delete button for current user's post */}
                    {isCurrentUserPost && (
                        <button
                            onClick={onDelete}
                            className="btn btn-error btn-circle"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <RiDeleteBinLine />
                            )}
                        </button>
                    )}

                    <dialog id={`comment_modal_${post._id}`} className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Comments</h3>
                            <Comment postId={post._id} />
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    )
}

export default Card