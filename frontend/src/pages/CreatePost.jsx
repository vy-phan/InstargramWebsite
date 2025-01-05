import React, { useState } from 'react'
import SlideBar from '../components/SlideBar';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const userIns = JSON.parse(localStorage.getItem('userIns'));

  if(!userIns){
    alert("Vui lòng đăng nhập để thực hiện chức năng này!");
    return <Navigate to="/login" />;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !caption.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('caption', caption);
      formData.append('userId', userIns.id);

      console.log('Sending data:', {
        image: imageFile,
        caption: caption,
        userId: userIns.id
      });

      const response = await axios.post('/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 5000
      });

      if (response.status === 201) {
        alert('Đăng bài thành công!');
        setCaption('');
        setImageFile(null);
        setPreviewUrl(null);
      } else {
        throw new Error(response.data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        rawResponse: error.response?.data,
        parsedResponse: typeof error.response?.data === 'string' 
          ? error.response?.data.substring(0, 200)
          : error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers
      });
      
      if (error.response) {
        let errorMessage;
        if (typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE html>')) {
          errorMessage = 'Lỗi server nội bộ. Vui lòng thử lại sau hoặc liên hệ admin.';
        } else {
          errorMessage = error.response.data?.message || error.response.data || error.response.statusText;
        }
        alert('Lỗi từ server: ' + errorMessage);
      } else if (error.request) {
        alert('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
      } else {
        alert('Có lỗi xảy ra: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
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
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? 'Đang đăng...' : 'Đăng bài'}
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
