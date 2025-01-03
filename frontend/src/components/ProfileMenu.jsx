import React from 'react'
import Avatar1 from '../assets/img/FB_IMG_1708595704236.jpg'
import { Link } from 'react-router-dom'

const ProfileMenu = () => {
    return (
        <div className="bg-base-100 p-4 rounded-box w-64">

            {/* Header with user info */}
            <div className="flex items-center justify-between mb-4">
                    <Link to="/profile" className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={Avatar1} />
                            </div>
                        </div>
                        <span className="font-semibold">Dino Sakura</span>
                    </Link>
                <a href="#" className="text-blue-500 text-sm">Log out</a>
            </div>

            {/* Suggested section */}
            <div className="mb-2">
                <p className="text-sm text-gray-500 mb-2">Suggested for you</p>
                <div className="space-y-3">
                    {/* Suggested User Item */}
                    {['Be Ngoc', 'Ngoc Neow', 'Huyen'].map((name, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="avatar">
                                    <div className="w-8 rounded-full">
                                        <img src={Avatar1} />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{name}</p>
                                    {index === 2 && <p className="text-xs text-gray-500">5 followers</p>}
                                </div>
                            </div>
                            <button className="text-blue-500 text-sm">Follow</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* See All link */}
            <div className="text-center">
                <a href="#" className="text-sm text-gray-600">See All</a>
            </div>
        </div>
    )
}

export default ProfileMenu
