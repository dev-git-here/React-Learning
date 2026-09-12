import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(function () {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  const copyPassword = useCallback(function () {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }, [password])



  useEffect(function () {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])




  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password generator</h1>

        {/* // INPUT TEXT */}
        <div className="flex shadow rounded-lg overflow-hidden mb-14">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-5 px-3 "
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800">
            Copy
          </button>
        </div>



        {/* // INPUT RANGE */}

        <div className=' flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>

            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={function (e) {
                setLength(e.target.value)
              }}
            />
            <label> length: {length}</label>
          </div>



          {/* // INPUT CHECKBOX NUMBERS */}
          <div className='flex items-center gap-x-2'>

            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={function () {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label> Numbers</label>
          </div>



          {/* // INPUT CHECKBOX CHARACTER */}
          <div className='flex items-center gap-x-2'>

            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={function () {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label> Special characters</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
