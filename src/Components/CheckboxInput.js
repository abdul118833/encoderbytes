import React from 'react'

const CheckboxInput = ({ isChecked, onChange, name, Label, img }) => {
    return (
        <span className='w-1/4 flex text-sm items-center'>
            <input checked={isChecked}
                onChange={onChange}
                name={name}
                type="checkbox" />
            <img src={img} alt={img} className="w-3 ml-2 object-cover" />
            <p className='ml-2'>{Label}</p>
        </span>
    )
}

export default CheckboxInput