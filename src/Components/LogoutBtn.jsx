import React from 'react'
import authService from '../Appwrite/Auth'
import { logout } from '../Features/AuthSlice'
import {useDispatch} from 'react-redux'
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler=()=>{
        authService.logoutAccount() .then(()=>{
            dispatch(logout());
        }) 
    }
  return (
    <div>
      <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default LogoutBtn
