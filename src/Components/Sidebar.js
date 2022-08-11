import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AccountPermissions from './AccountPermissions'

const Sidebar = () => {
    let navigate = useNavigate()
    const userData = useSelector(state => state.userSlice.userData)
    const Logout = () => {
        navigate('/')
        localStorage.clear()
    }
    return (
        <div>
            {userData.AccountPermissions.IsOperatorMgt && <AccountPermissions img="/staff.png" text="Staff" />}
            {userData.AccountPermissions.IsDriver && <AccountPermissions img="/driver.png" text="Driver" />}
            {userData.AccountPermissions.IsVehicle && <AccountPermissions img="/vehicle.png" text="Manage Driver" />}
            {userData.AccountPermissions.IsMessages && <AccountPermissions img="/email.png" text="Messages" />}
            {userData.AccountPermissions.IsShift && <AccountPermissions img="/shift.png" text="shift" />}
            {userData.AccountPermissions.IsReports && <AccountPermissions img="/timetable.png" text="Reports" />}
            {userData.AccountPermissions.IsSettings && <AccountPermissions img="/settings.png" text="Settings" />}
            {userData.AccountPermissions.IsDocuments && <AccountPermissions img="/documents.png" text="Document" />}
            {userData.AccountPermissions.IsTags && <AccountPermissions img="/pricetag.png" text="Tags" />}
            {userData.AccountPermissions.IsSheild && <AccountPermissions img="/shield.png" text="Sheild" />}
            {userData.AccountPermissions.IsPayments && <AccountPermissions img="/dollar.png" text="Payments" />}
            {userData.AccountPermissions.IsNotifications && <AccountPermissions img="/bell.png" text="Notifications" />}
            <button className='p-2 bg-appColor rounded mt-2 text-white' onClick={Logout}>
                Logout
            </button>
        </div>
    )
}

export default Sidebar
