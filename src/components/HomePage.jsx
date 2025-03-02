import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const [input,setInput]= useState("");
    const navigate= useNavigate();
    const submitHandler=()=>{
 navigate(`/room/${input}`)
    }
  return (
    <div>
    <input
    type='text'
    value={input}
    placeholder='Enter your Name..'
    onChange={(e)=>setInput(e.target.value)}
    />
     <button onClick={submitHandler}>join</button>
    </div>
  )
}

export default HomePage
