import React from 'react'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const userData = useSelector(state => state.userSlice.userData)
    return (
        <div className=' bg-appColor'>
            <div className='container mx-auto p-2 flex justify-between'>
                {/* logo */}
                <div className='bg-white p-2 rounded'>
                    <img src='/logoCompany.png' className='w-24' />
                </div>

                {/* Search  */}
                <div className='flex bg-searchBgColor w-2/4 rounded items-center px-2'>
                    <input className='w-full bg-searchBgColor text-white placeholder:text-white focus:outline-none mr-2 text-sm rounded px-2' placeholder='Serch Web Administrator' />
                    <span className='bg-white rounded w-7 h-7 flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 bg-white" fill="none" viewBox="0 0 24 24" stroke="blue" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>

                {/* Avatar and Name  */}
                <div className='flex items-center'>
                    <div className='mr-3 flex flex-col items-end text-white'>
                        <p className='text-sm'>{userData.name}</p>
                        <p className='text-xs'>Admin</p>
                    </div>
                    <div className='w-12 h-12 rounded-full bg-white flex justify-center items-center'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar