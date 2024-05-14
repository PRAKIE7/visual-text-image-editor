import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Protected({children, authenticate= true}) {
    const navigate= useNavigate();
    const [loader, setLoader]= useState(true)
    const authStatus = useSelector(state=> state.auth.Status)

    useEffect(()=>{
        if(authenticate !== authStatus){
            navigate("/login")
        } else if(authenticate == authStatus){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authenticate])
  return loader ? <div>Loading...</div> : {children};
}

export default Protected
