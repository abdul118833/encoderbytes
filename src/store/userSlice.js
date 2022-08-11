import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: JSON.parse(localStorage.getItem('userData')) || {},
}

export const userSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            localStorage.setItem('userData', JSON.stringify(action.payload))
            state.userData = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const userSliceActions = userSlice.actions

export default userSlice.reducer