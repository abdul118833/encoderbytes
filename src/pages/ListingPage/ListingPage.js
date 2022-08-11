import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { Oval } from 'react-loader-spinner'
const token = localStorage.getItem('token') && localStorage.getItem('token')
const authToken =
    "Bearer " + token;

const ListingPage = () => {
    let user = useSelector(state => state.userSlice.userData)
    console.log(user, "hhhh")
    let navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [to, setTo] = useState(1)
    const [from, SetFrom] = useState(10)
    const [total, setTotal] = useState(0)
    const [selectedValue, setSelectedValue] = useState('IsActive')
    const [searchBy, setSearchBy] = useState({ label: 'Id', value: 'Id' })
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState(false)
    const [search, setSearch] = useState('')

    const searchByCatagory = [
        { label: 'Id', value: 'Id' },
        { label: 'Name', value: 'Name' },
        { label: 'Email', value: 'Email' },
        { label: 'MobileNumber', value: 'MobileNumber' },
        { label: 'PhoneNumber', value: 'PhoneNumber' },
    ]
    const handleChange = (e) => {
        let searchByCopy = { ...searchBy }
        searchByCopy.label = e.target.value
        searchByCopy.value = e.target.value
        setSearchBy(searchByCopy)
    }
    const getUserListing = (dataTo, dataFrom) => {
        let options = {}
        console.log(searchBy, "Seacrh by of Listing", search)
        const type = ["Email", "Id", "Name", "MobileNumber", "PhoneNumber"];
        if (type.includes(searchBy.value)) {
            options = {
                method: "GET",
                url: `${process.env.REACT_APP_SERVER_PATH}/OperatorManagement/GetOperator`,
                params: {
                    To: dataTo,
                    From: dataFrom,
                    IsActive: selectedValue === "IsActive" ? "true" : "false",
                    [searchBy.value]: search
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            };
        }
        setLoading(true)
        axios.request(options).then(function (response) {
            console.log(response.data, "Listing");
            console.log(response.data.Content.Count[0].RowsCount, "count");
            setTotal(response.data.Content.Count[0].RowsCount)
            setUsers(response.data.Content.ManageOperator)
            setLoading(false)
        }).catch(function (error) {
            console.error(error);
            setLoading(false)
        });
    }
    useEffect(() => {
        getUserListing(to, from)
    }, [selectedValue, to, from])
    console.log(searchBy, "search by")
    const handlePageClick = (data) => {
        console.log(data.selected, "data.clicked")
        let dataTo = (data.selected) * 10
        let dataFrom = dataTo + 10
        setTo(dataTo)
        SetFrom(dataFrom)
        getUserListing(dataTo, dataFrom)

    }
    return (
        <div className='bg-gray-100 p-8'>

            <p>{to}{"   "} {from}</p>
            <div className='flex justify-between my-2'>
                <div>
                    <p className='text-xs text-gray-600'>Operator manage</p>
                    <p className='text-xl font-bold text-gray-700'>Staff Manage</p>
                </div>
                <button className='px-3 p-2 rounded bg-appColor text-sm text-white'>Add Staff</button>
            </div>
            <div className='bg-white p-5 rounded'>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-xl text-gray-700'>Staff Manage</p>
                        <p className='text-xs text-gray-600'>{total} Staff manage</p>
                    </div>
                    <div className='flex bg-white mb-2'>
                        <div className='border flex rounded'>
                            <div className='flex flex-col border-r p-2'>
                                <label className='ml-1 text-xs text-gray-500 mb-1'>Show by</label>
                                <select value={searchBy.value} onChange={handleChange} className='border-none focus:outline-none text-xs'>
                                    {searchByCatagory.map((cat) => {
                                        return <option value={cat.Name} className="text-sm">{cat.value}</option>
                                    })}
                                </select>
                            </div>
                            <div className='flex w-96 rounded items-center px-2'>
                                <input placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} className='w-full focus:outline-none mr-2 text-sm rounded px-2' />
                                {!filter ? <button className={`bg-white rounded w-7 h-7 flex items-center justify-center ${search === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    disabled={search === ''}
                                    onClick={() => {
                                        getUserListing(to, from)
                                        setFilter(prev => !prev)
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 bg-white" fill="none" viewBox="0 0 24 24" stroke="blue" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button> :
                                    <button className='bg-white rounded w-7 h-7 flex items-center justify-center' onClick={() => {
                                        setFilter(prev => !prev)
                                        setSearch('')
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>}
                            </div>
                        </div>
                        <div className='flex flex-col border rounded p-2 ml-3'>
                            <label className='ml-1 text-xs text-gray-500 mb-1'>Show by</label>
                            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} className='border-none focus:outline-none text-xs'>
                                <option value="IsActive" className='p-2 text-sm'>IsActive</option>
                                <option value="InActive" className='p-2 text-sm'>InActive</option>
                            </select>
                        </div>
                    </div>
                </div>
                {!loading ? <div className='overflow-y-scroll' style={{ height: '400px' }}>
                    <table className='w-full text-sm text-left font-normal text-gray-900 rounded '>
                        <thead>
                            <tr className='bg-gray-100'>
                                {['#', 'Staff Id', 'Staff Name', 'Email', 'Phone', 'Account Permissions', 'Status', 'Actions'].map((item) => {
                                    return <th scope="col" className={`py-3 px-2 text-sm ${item === 'Actions' ? 'text-center' : 'text-left'} font-normal`}>{item}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((u, i) => {
                                return <tr className='border-b hover:bg-red-50'>
                                    <td scope="col" className='py-3 px-1'>
                                        {i + 1}
                                    </td>
                                    <td scope="col" className='py-3 px-1'>
                                        {u.ID}
                                    </td>
                                    <td scope="col" className='py-3 px-1'>
                                        {u.Name}
                                    </td>
                                    <td scope="col" className='py-3 px-1'>
                                        {u.Email !== "" ? u.Email : "--"}
                                    </td>
                                    <td scope="col" className='py-3 px-1'>
                                        {u.PhoneNumber !== "" ? u.PhoneNumber : "--"}
                                    </td>
                                    <td scope="col" className='py-3 px-1 flex items-center'>
                                        {u.IsOperatorMgt && <img src='/staff.png' className='w-4 object-cover mr-1' alt="image" />}
                                        {u.IsVehicle && <img src='/vehicle.png' className='w-4 object-cover mr-1' alt="image" />}
                                        {u.IsDriver && <img src='/driver.png' className='w-4 object-cover mr-1' alt="image" />}
                                        {u.IsReports && <img src='/documents.png' className='w-4 object-cover mr-1' alt="image" />}
                                        {u.IsSchedule && <img src='/timetable.png' className='w-4 object-cover mr-1' alt="image" />}
                                        {u.IsNotifications && <img src='/email.png' className='w-4 object-cover mr-1' alt="image" />}

                                    </td>
                                    <td scope="col" className='py-3 px-1'>
                                        {u.IsActive ? 'Active' : 'Inactive'}
                                    </td>
                                    <td scope="col" className='py-3 flex justify-center'>
                                        <button className='bg-green-500 w-8 h-8 rounded-full flex items-center justify-center' onClick={() => {
                                            navigate(`/dashboard/updateUser/${u.ID}`)
                                        }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg></button>
                                    </td>
                                </tr>

                            }) : 'No users to show'}
                        </tbody>
                    </table>


                </div> : <div className='flex  justify-center items-center' style={{ height: '400' }}>
                    <Oval
                        height={50}
                        width={50}
                        color="lightblue"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="lightblue"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </div>}

                <div className='w-full flex items-center justify-between my-5'>
                    <div className='flex flex-col border rounded p-2 w-24'>
                        <label className='ml-1 text-xs text-gray-500 mb-1'>Search by</label>
                        <select value={10} onChange={(e) => {
                            setTo(0)
                            SetFrom(Number(e.target.value))
                        }} className='border-none focus:outline-none text-xs'>
                            <option value={10} className='p-2 text-sm'>10</option>
                            <option value={20} className='p-2 text-sm'>20</option>
                            <option value={30} className='p-2 text-sm'>30</option>
                            <option value={40} className='p-2 text-sm'>40</option>
                        </select>
                    </div>
                    <ReactPaginate
                        previousLabel="<"
                        nextLabel=">"
                        previousClassName='flex justify-center items-center w-8 h-8 rounded p-2 border'
                        nextClassName='flex justify-center items-center w-8 h-8 rounded p-2 border'
                        pageCount={total / 10}
                        onPageChange={handlePageClick}
                        containerClassName="flex"
                        pageClassName='flex justify-center items-center w-8 h-8 rounded p-2 border'
                        activeClassName='border-2 border-appColor'
                    />
                    <div></div>
                </div>
            </div>

        </div >
    )
}

export default ListingPage