import React from 'react'
import { useGetComment } from '../hooks/useGetComment';
import { formatDate } from '../utils/dataFomat';
import { useGetUser } from '../hooks/useGetUser';
import { useAddComment } from '../hooks/useAdd_DeleteComment';

const Comment = ({ postId }) => {
  const { comments, isLoading, error } = useGetComment(postId);
  const { users } = useGetUser();
  const { addComment } = useAddComment(); 

  const [commentText, setCommentText] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      // Gửi postId và text riêng biệt thay vì gửi object
      await addComment(postId, commentText);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (isLoading ) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="py-4">
      <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3 mb-4">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img 
                    src={
                        users?.find(user => user._id === comment.userId)?.profilePicture || 
                        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
                    } 
                    alt="user" 
                />
              </div>
            </div>

            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">{users?.find(user => user._id === comment.userId)?.username}</p>
                <span className="text-xs text-gray-500">•</span>
                <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form className="flex gap-2" onSubmit={handleSubmit}>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById(`comment_modal_${postId}`).close()}>✕</button>
        <input
          type="text"
          placeholder="Nhập bình luận..."
          className="input input-bordered w-full"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          Gửi
        </button>
      </form>
    </div>
  )
}

export default Comment
