import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import ListingPage from './ListingPage/ListingPage'
import UpdateUser from './UpdateUser/UpdateUser'
import Sidebar from '../Components/Sidebar'

const Dashboard = () => {
    return (
        <div className="h-screen">
            <Navbar />
            <div className="w-full flex h-full">
                <div className="w-2/12 p-4">
                    <Sidebar />
                </div>
                <div className="w-10/12 overflow-y-auto bg-gray-100">
                    <Routes>
                        <Route index path="/" element={<ListingPage />} />
                        <Route path="updateUser/:id" element={<UpdateUser />} />
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default Dashboard