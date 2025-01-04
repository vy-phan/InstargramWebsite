import React, { useState } from 'react'
import SlideBar from '../components/SlideBar';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic submit ở đây
    console.log('Caption:', caption);
    console.log('Image:', imageFile);
  };

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
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Tạo bài viết mới</h2>

              <form onSubmit={handleSubmit}>
                {/* Phần upload ảnh */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium">
                    Chọn ảnh
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 mt-2
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                      required
                    />
                  </label>

                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Phần caption */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium">
                    Caption
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      required
                      placeholder="Viết caption cho bài viết của bạn..."
                    />
                  </label>
                </div>

                {/* Nút đăng bài */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Đăng bài
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>


  )
}

export default CreatePost
