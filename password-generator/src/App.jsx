import { useState, useCallback, useEffect, useRef } from 'react'

export default function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let pass = ''
    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '@#$~&^*%('

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [numberAllowed, charAllowed, password, length])

  const selectPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }, [password])
  useEffect(() => {
    passwordGenerator()
  }, [numberAllowed, charAllowed, length])
  return (
    <>
      <div className='w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md'>
        <h1 className='my-3 text-center text-white'>Password generator</h1>
        <div className='flex mb-4 overflow-hidden rounded-lg shadow'>
          <input
            type='text'
            value={password}
            className='w-full px-3 py-1 outline-none'
            placeholder='password'
            ref={passwordRef}
            readOnly></input>
          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-sky-700'
            onClick={selectPassword}>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={e => {
                setLength(e.target.value)
              }}></input>
            <label>length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='NumberInput'
              onChange={() => {
                setNumberAllowed(prev => !prev)
              }}></input>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharacterAllowed(prev => !prev)
              }}></input>
            <label htmlFor='charInput'>chracter</label>
          </div>
        </div>
      </div>
    </>
  )
}
