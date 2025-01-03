import React from 'react'

const Card = () => {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img 
          src="https://media.vov.vn/sites/default/files/styles/large/public/2023-09/4_47.jpg" 
          alt="Breaking Bad Scene" 
          className="w-full h-auto object-cover"
        />
      </figure>
      
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold">Rose</span>
            <span className="text-sm text-gray-500">20h ago</span>
          </div>
        </div>
        
        <div className="card-actions justify-start mt-4">
          <button 
            className="btn btn-ghost btn-circle"
            onClick={() => setIsLiked(!isLiked)}
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
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
