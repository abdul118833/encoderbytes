import React from 'react'

const AccountPermissions = ({ img, text }) => {
    return <span className='flex items-center mb-2'>
        <img src={img} alt='img' className='w-3 object-cover mr-2' />
        <p className='text-sm text-gray-800'>{text}</p>
    </span>
}

export default AccountPermissions