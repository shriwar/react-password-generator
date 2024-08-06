import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function App() {
  const [length,setlength] = useState(8)
  const  [numberAllowed,setNumberAllowed] = useState((false));
  const [charAllowed,setCharAllowed] = useState((false))
  const [password,setPassword] = useState((''))

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( ()=>{
    let pass = ''
    let str = 'qwertyuiopasdfghjklzxcvbnm'
    if (numberAllowed){
      str += '0123456789';
    }
    if (charAllowed){
      str += '!@#$%^&*()';
    }
    for (let i = 0; i < length; i++) {
      const char = Math.floor((Math.random() * str.length )+1);

      pass += str.charAt(char)
      
    }
    setPassword(pass);
  }, [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div>
      <div className='w-full max-w-full mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 text-center bg-gray-800'>
        <h1 className='text-white text-center'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}></input>
          <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 mx-3 my-3'
          onClick={copyPasswordToClipboard}>Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={12}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}>
            
              
            </input>
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() =>{
              setNumberAllowed((prev) => !prev);
            }}></input>
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() =>{
              setCharAllowed((prev) => !prev);
            }}></input>
            <label>Characters</label>
          </div>
        </div>

      </div>
      
    </div>
  )
}
