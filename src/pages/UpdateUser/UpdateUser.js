import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import UpdateUserInput from './UpdateUserInput'
import CheckboxInput from '../../Components/CheckboxInput'
const UpdateUser = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    const [user, setUser] = useState({})
    const [defaultDivision, setDefaultDivision] = useState([])
    const [divisionFeature, setdivisionFeature] = useState([])
    const [divisionFeatureMask, setDivisionFeatureMask] = useState(0)
    const [defaultDivisionMaskArray, setDefaultDivisionMaskArray] = useState([])
    const [selectedDefault, setSelectedDefault] = useState(0)
    const [channels, setChannels] = useState([])
    const [value, setValue] = useState('')
    const [channelId, setChannelId] = useState(null)
    const [flag, setFlag] = useState(0)

    const getDivision = () => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/FeatureManagement/GetFeatures?IsActive=true&FTypeId=7`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data, "types")
            setDefaultDivision(response.data.Content)
            setdivisionFeature(response.data.Content)
            getSelectDivisionMask(response.data.Content)
        }).catch(e => {
            console.log(e.response.data, "error")

        })
    }

    const getChannels = () => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/TagsManagement/GetChannels`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            setChannels(response.data.Content)
        }).catch(e => {
            console.log(e.response.data, "error")

        })
    }
    const getUserData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/OperatorManagement/GetOperator?Id=${id}&IsActive=true`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data, "User")
            setUser({ ...response.data.Content.ManageOperator[0], ConfirmPassword: response.data.Content.ManageOperator[0].Password })
            setValue(response.data.Content.ManageOperator[0].Channel)
            setDivisionFeatureMask(response.data.Content.ManageOperator[0].DivisionMask)
            // For Default Set
            setSelectedDefault(response.data.Content.ManageOperator[0].DefaultDivisionMask)
            getDivision()
        }).catch(e => {
            console.log(e.response.data, "error")

        })
    }


    const handleDefaultDivision = (mask) => {
        setSelectedDefault(mask)
    }

    const getSelectDivisionMask = (data) => {
        setFlag(1)
        data.forEach(m => {
            if (divisionFeatureMask & m.BitMask) {
                setDefaultDivisionMaskArray(prev => [...prev, m.BitMask])
            } else {
                const defaultDivisionMaskArrayCopy = [...defaultDivisionMaskArray]
                const itemIndex = defaultDivisionMaskArrayCopy.indexOf(m.BitMask)
                defaultDivisionMaskArrayCopy.splice(itemIndex, 1)
                setDefaultDivisionMaskArray(defaultDivisionMaskArrayCopy)
            }
        })
    }

    const handleDivisionFeature = (mask) => {
        if (defaultDivisionMaskArray.includes(mask)) {
            // Remove
            const defaultDivisionMaskArrayCopy = [...defaultDivisionMaskArray]
            const itemIndex = defaultDivisionMaskArrayCopy.indexOf(mask)
            defaultDivisionMaskArrayCopy.splice(itemIndex, 1)
            setDefaultDivisionMaskArray(defaultDivisionMaskArrayCopy)
        } else {
            // Add
            setDefaultDivisionMaskArray([...defaultDivisionMaskArray, mask])
        }
    }
    const saveData = () => {
        let additionBitMask = 0
        defaultDivisionMaskArray.forEach((e) => {
            divisionFeature.forEach(d => {
                if (e === d.BitMask) {
                    additionBitMask = additionBitMask + d.BitMask
                }
            })
        })
        return additionBitMask
        console.log(additionBitMask, "additionBitMask")
    }
    const updataUserData = () => {
        let updateUser = {
            Id: id,//Required
            UserName: "majid@hollywoodcars",//Required with same no change
            Password: user.Password, //Required
            Email: user.Email,
            Name: user.Name, //Required
            DOB: null,
            MartialStatus: 1,
            Gender: 1,
            JobTitle: null,
            JoiningDate: null,
            HouseNo: user.HouseNo,
            Street: user.Street,
            Area: user.Area,
            MobileNumber: user.MobileNumber,
            PhoneNumber: user.PhoneNumber,
            Country: user.Country,
            State: null,
            City: user.City,
            WorkExperience: null,
            Description: null,
            ViewOrder: 0,
            DivisionMask: selectedDefault,
            DefaultDivisionMask: saveData(),
            ChannelId: channelId !== null ? channelId : user.ChannelId, //Required with Same
            IsLockedOut: false,
            IsMaster: user.IsMaster ? true : false,
            PS: {
                IsDriver: user.IsDriver ? 1 : 0,
                IsVehicle: user.IsVehicle ? 1 : 0,
                IsMessages: user.IsMessages ? 1 : 0,
                IsShift: user.IsShift ? 1 : 0,
                IsFullAccounts: user.IsFullAccounts ? 1 : 0,
                IsReports: user.IsReports ? 1 : 0,
                IsSettings: user.IsSettings ? 1 : 0,
                IsZoneView: user.IsZoneView ? 1 : 0,
                IsZoneAll: user.IsZoneAll ? 1 : 0,
                IsOperatorMgt: user.IsOperatorMgt ? 1 : 0,
                IsSMS: user.IsSMS ? 1 : 0,
                IsDriverRent: user.IsDriverRent ? 1 : 0,
                IsWallboard: user.IsWallboard ? 1 : 0,
                ViewOrder: 0,
                Description: "Persmiision",
                IsDocuments: user.IsDocuments ? 1 : 0,
                IsSchedule: user.IsSchedule ? 1 : 0,
                IsFeatureMngmnt: user.IsFeatureMngmnt ? 1 : 0,
                IsTags: user.IsTags ? 1 : 0,
                IsSheild: user.IsSheild ? 1 : 0,
                IsPricing: user.IsPricing ? 1 : 0,
                IsDm8: user.IsDm8 ? 1 : 0,
                IsCabsnipper: user.IsCabsnipper ? 1 : 0,
                IsCustomerProfile: user.IsCustomerProfile ? 1 : 0,
                IsPayments: user.IsPayments ? 1 : 0
            }
        }

        let Match = user.Password === user.ConfirmPassword
        let Check = (Match && user.Name !== '' && user.UserName !== '' && user.Password !== '' && user.ConfirmPassword !== '')
        if (Check) {
            axios.post(`${process.env.REACT_APP_SERVER_PATH}/OperatorManagement/UpdateOperator`, updateUser, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data, "Update Data")
                navigate('/dashboard')
            }).catch(e => {
                console.log(e.response.data, "error")
                alert('NotUpdated')

            })
        } else {
            alert('Please fill all the field')
        }


    }
    useEffect(() => {
        window.scrollTo(0, 0)
        getUserData()
        getChannels()

    }, [flag])

    const handleChange = event => {
        setUser(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))
    }

    const handleChangeForCheckBox = event => {
        console.log(event.target.checked)
        setUser(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.checked
        }))
    }

    return (
        <div className='p-6'>
            <div>
                <p className='text-xs text-gray-600'>Staff Manage</p>
                <p className='text-xl font-bold text-gray-700'>Edit Staff</p>
            </div>


            <div className='w-full p-4 bg-white rounded mt-4 flex'>
                <div className='w-1/4 flex items-start'>
                    <span className='w-8 rounded-full mt-1 mr-2'>
                        <img src='/user.png' className='w-5 object-cover' />
                    </span>
                    <div>
                        <p className='text-xl text-gray-700'>Edit Staff</p>
                        <p className='text-xs text-gray-600'>Staff Manage</p>
                    </div>
                </div>
                <div className='w-3/4 flex flex-wrap'>
                    <UpdateUserInput
                        Required='required'
                        type="text"
                        placeholder="Name"
                        values={user.Name}
                        name="Name"
                        handleChange={handleChange}
                        label="Full Name"
                    />
                    <UpdateUserInput
                        Required='required'
                        type="text"
                        placeholder="User Name"
                        values={user.UserName}
                        name="UserName"
                        handleChange={handleChange}
                        label="User Name"
                    />
                    <UpdateUserInput
                        Required='required'
                        type="email"
                        placeholder="abc@gmail.com"
                        values={user.Email}
                        name="Email"
                        handleChange={handleChange}
                        label="Email"
                    />
                    <div className='p-2 border w-64 rounded bg-white m-2'>
                        <p className='ml-1 text-xs text-gray-700'>Staff Channel <span className='text-red-500 ml-2'>*</span></p>
                        <select value={user.ChannelId} className='w-full text-sm focus:outline-none' onChange={(e) => {
                            console.log(e.target.value, "jjj")
                            setChannelId(Number(e.target.value))
                        }}>
                            {channels.map(channel => {
                                return <option value={String(channel.Id)}>{channel.Channel}</option>
                            })}
                        </select>
                    </div>
                    <UpdateUserInput
                        Required='required'
                        type="password"
                        placeholder="password"
                        values={user.Password}
                        name="Password"
                        handleChange={handleChange}
                        label="Create Password"
                    />
                    <UpdateUserInput
                        Required='required'
                        type="password"
                        placeholder="password"
                        values={user.ConfirmPassword}
                        name="ConfirmPassword"
                        handleChange={handleChange}
                        label="Confirm Password"
                    />
                    <UpdateUserInput
                        type="text"
                        placeholder="Mobile Number"
                        values={user.MobileNumber}
                        name="MobileNumber"
                        handleChange={handleChange}
                        label="Mobile Number"
                    />
                    <UpdateUserInput
                        type="text"
                        placeholder="Phone Number"
                        values={user.PhoneNumber}
                        name="Phone Number"
                        handleChange={handleChange}
                        label="Phone Number"
                    />
                </div>

            </div>


            {/* Address Details  */}
            <div className='w-full p-4 bg-white rounded mt-4 flex'>
                <div className='w-1/4 flex items-start'>
                    <span className='w-5 h-5 rounded-full bg-white mt-1 mr-2'>

                    </span>
                    <div>
                        <p className='text-xl text-gray-700'>Address Details</p>
                        <p className='text-xs text-gray-600'>Add operator address details</p>
                    </div>
                </div>
                <div className='w-3/4'>
                    <div className='p-2 flex'>
                        <input type="checkbox" />
                        <p className='text-xs text-gray-700 ml-2'>Add Address Details</p>
                    </div>
                    <div className='w-full flex flex-wrap'>
                        <UpdateUserInput
                            type="text"
                            placeholder="House No"
                            values={user.HouseNo}
                            name="HouseNo"
                            handleChange={handleChange}
                            label="House No"
                        />
                        <UpdateUserInput
                            type="text"
                            placeholder="Street"
                            values={user.Street}
                            name="Street"
                            handleChange={handleChange}
                            label="Street"
                        />
                        <div className='p-2 border w-64 rounded bg-white m-2'>
                            <p className='ml-1 text-xs text-gray-700'>Country</p>
                            <select value='England' className='w-full text-sm focus:outline-none' name='Country' onChange={handleChange}>
                                <option value="Pakistan">Pakistan</option>
                                <option value="India">India</option>
                                <option value="America">America</option>
                                <option value="Germany">Germany</option>
                                <option value="GB">GB</option>
                                <option value="Uk">Uk</option>
                                <option value="Austria">Austria</option>

                            </select>
                        </div>
                        <div className='p-2 border w-64 rounded bg-white m-2'>
                            <p className='ml-1 text-xs text-gray-700'>City</p>
                            <select value='Dublin' className='w-full text-sm focus:outline-none' name="City" onChange={handleChange}>
                                <option value="New Yo">New York</option>
                                <option value="Sharjah">Sharjah</option>
                                <option value="Pindi">Pindi</option>
                                <option value="IslamAbad">IslamAbad</option>
                                <option value="Peshawer">Peshawer</option>
                                <option value="Charsadda">Charsadda</option>
                                <option value="Venzuella">Venzuella</option>
                            </select>
                        </div>
                        <UpdateUserInput
                            type="text"
                            placeholder="Area"
                            values={user.Area}
                            name="Area"
                            handleChange={handleChange}
                            label="Area"
                        />
                        <UpdateUserInput
                            type="text"
                            placeholder="PostCode"
                            values={user.PostCode}
                            name="PostCode"
                            handleChange={handleChange}
                            label="Post Code"
                        />
                    </div>
                </div>

            </div>

            {/* Permissrion Rights  */}


            <div className='w-full p-4 bg-white rounded-t mt-4 flex'>
                <div className='w-1/4 flex items-start'>
                    <span className='w-8 rounded-full mt-1 mr-2'>
                        <img src='/user.png' className='w-5 object-cover' />
                    </span>
                    <div>
                        <p className='text-xl text-gray-700'>Permission Rights</p>
                        <p className='text-xs text-gray-600'>SSelect Permission rights you can check multiple Permission for staff</p>
                    </div>
                </div>
                <div className='w-3/4 flex flex-wrap ml-2'>

                    <CheckboxInput
                        Label='Manage Accounts'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsFullAccounts ? true : false}
                        name='IsFullAccounts'
                        img="/signal.png"
                    />
                    <CheckboxInput
                        Label='Driver'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsDriver ? true : false}
                        name='IsDriver'
                        img="/driver.png"

                    />
                    <CheckboxInput
                        Label='Schedule'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsSchedule ? true : false}
                        name='IsSchedule'
                        img="/timetable.png"

                    />
                    <CheckboxInput
                        Label='Shift'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsShift ? true : false}
                        name='IsShift'
                        img="/shift.png"
                    />
                    <CheckboxInput
                        Label='Tags'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsTags ? true : false}
                        name='IsTags'
                        img="/pricetag.png"

                    />
                    <CheckboxInput
                        Label='Zone'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsZone ? true : false}
                        name='IsZone'
                        img="/timetable.png"

                    />
                    <CheckboxInput
                        Label='Staff'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsOperatorMgt ? true : false}
                        name='IsOperatorMgt'
                        img="/staff.png"

                    />
                    <CheckboxInput
                        Label='Settings'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsSettings ? true : false}
                        name='IsSettings'
                        img="/settings.png"

                    />

                    <CheckboxInput
                        Label='Notifications'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsNotifications ? true : false}
                        name='IsNotifications'
                        img="/email.png"
                    />
                    <CheckboxInput
                        Label='Documents'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsDocuments ? true : false}
                        name='IsDocuments'
                        img="/documents.png"

                    />

                    <CheckboxInput
                        Label='Cabsnipper'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsCabsnipper ? true : false}
                        name='IsCabsnipper'
                        img="/email.png"
                    />
                    <CheckboxInput
                        Label='Manage Feature'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsFeatureMngmnt ? true : false}
                        name='IsFeatureMngmnt'
                        img="/file.png"

                    />
                    <CheckboxInput
                        Label='Pricing'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsPricing ? true : false}
                        name='IsPricing'
                        img="/dollar.png"

                    />
                    <CheckboxInput
                        Label='Payments'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsPayments ? true : false}
                        name='IsPayments'
                        img="/file.png"

                    />
                    <CheckboxInput
                        Label='Sheild'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsSheild ? true : false}
                        name='IsSheild'
                        img="/shield.png"

                    />
                    <CheckboxInput
                        Label='Manage Vehicles'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsVehicle ? true : false}
                        name='IsVehicle'
                        img="/vehicle.png"

                    />
                    <CheckboxInput
                        Label='External Operator'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsExternalOperator ? true : false}
                        name='IsExternalOperator'
                        img="/bell.png"

                    />
                    <hr />
                </div>


            </div>


            {/* Master Rights  */}


            <div className='w-full p-4 bg-white rounded-b flex items-center border-t'>
                <div className='w-1/4 flex items-start'>
                    <span className='w-8 rounded-full mt-1 mr-2'>
                        <img src='/user.png' className='w-5 object-cover' />
                    </span>
                    <div>
                        <p className='text-xl text-gray-700'>Master Rights</p>
                    </div>
                </div>
                <div className='w-3/4 ml-2'>
                    <CheckboxInput
                        Label='Is Master'
                        onChange={handleChangeForCheckBox}
                        isChecked={user.IsMaster ? true : false}
                        name='IsMaster'
                    />
                </div>

            </div>

            <div className='w-full p-4 bg-white rounded-t flex items-center mt-4'>
                <div className='w-1/4 flex items-start'>
                    <span className='w-8 rounded-full mt-1 mr-2'>
                        <img src='/user.png' className='w-5 object-cover' />
                    </span>
                    <div>
                        <p className='text-xl text-gray-700'>Staff Default Division</p>
                        <p className='text-xs text-gray-400 mt-1'>Select default division features you can check one feature for Staff</p>
                    </div>
                </div>
                <div className='w-3/4 ml-2 flex flex-wrap'>
                    {defaultDivision.map((d) => {
                        return <span className='w-1/4 flex text-sm' key={d.BitMask}>
                            <input
                                checked={selectedDefault === d.BitMask ? true : false}
                                onChange={() => handleDefaultDivision(d.BitMask)}
                                type="checkbox" />
                            <p className='ml-2'>{d.Name}</p>
                        </span>
                    })}
                </div>
            </div>


            {/* Division Feature  */}

            <div className='w-full p-4 bg-white rounded-b flex items-center border-t'>
                <div className='w-1/4 flex items-start'>
                    <span className='w-8 rounded-full mt-1 mr-2'>
                        <img src='/user.png' className='w-5 object-cover' />
                    </span>
                    <div>
                        <p className='text-xl text-gray-700'>Division Features</p>
                        <p className='text-xs text-gray-400 mt-1'>Select default division features you can check multiple feature for Staff</p>
                    </div>
                </div>
                <div className='w-3/4 ml-2 flex flex-wrap'>
                    {divisionFeature.map((d) => {
                        return <span className='w-1/4 flex text-sm' key={d.BitMask}>
                            <input
                                checked={defaultDivisionMaskArray.includes(d.BitMask) ? true : false}
                                onChange={() => handleDivisionFeature(d.BitMask)}
                                type="checkbox" />
                            <p className='ml-2'>{d.Name}</p>
                        </span>
                    })}
                </div>
            </div>

            <button className='bg-appColor p-2 text-white rounded mt-2 ' onClick={updataUserData}>Save</button>
        </div>

    )
}

export default UpdateUser



