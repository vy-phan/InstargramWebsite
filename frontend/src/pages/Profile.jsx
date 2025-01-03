import React from 'react'
import SlideBar from '../components/SlideBar'

const Profile = () => {
    return (
        <div>
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    {/* Left sidebar */}
                    <div className="col-span-2 min-h-[500px] p-4 border-r border-gray-300">
                        <SlideBar />
                    </div>

                    {/* Main content */}
                    <div className="col-span-10 min-h-[500px] p-28">
                        {/* Profile Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <img 
                                src="https://i.pinimg.com/736x/09/68/56/09685639a6d903726b75cf5ce8c8753a.jpg" 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">Base Suzy</h1>
                                <div className="flex gap-4 text-gray-600 mt-2">
                                    <span>4 Posts</span>
                                </div>
                                <p className="mt-2">I'am Base Suzy</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="border-t border-gray-300 mb-8">
                            <div className="flex gap-8 justify-start py-4">
                                <button className="font-medium">POSTS</button>
                            </div>
                        </div>

                        {/* Image Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <img 
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
