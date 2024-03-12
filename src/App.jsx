import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
 const [length,setLength] = useState(8);
 const [numAllowed , setNum] =useState(false);
 const [charAllowed, setChar] = useState(false);
 const [password , setPassword] = useState("");

 //useRef hook
 const passwordRef =useRef(null) //use this to highlight password after copying , can be used for other things 

 const passwordGenerator = useCallback(() => { //whenever value changes in array given below it the function runs
  let pass= ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numAllowed) str += "0123456789"
  if (charAllowed) str += "!@#$%^&*()_+{}=~-[]"

   for(let i =1 ; i<=length ; i++){
    let char = Math.floor(Math.random() * str.length + 1)

    pass +=str.charAt(char)
   
   }

  setPassword(pass)




 } , [length,numAllowed,charAllowed,setPassword])

 //copyPasswordToClipboard
 const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password) //cpoy the password to clipboard
 })

 useEffect(() => {
  passwordGenerator()  // to reload page and get value in password input field automatically
 },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white bg-black'> {/* Changed text color and background color */}
  <h1 className='text-center my-3'>Password Generator</h1> {/* Removed text color class */}
  <div className='flex items-center justify-between mb-4'> {/* Added justify-between to center the input and button */}
   
   
    <input type="text" 
    value={password}
     className='outline-none w-full py-1 px-3 rounded-lg mr-2 bg-gray-800' placeholder='Password'
      readOnly 
      ref={passwordRef} //useRef to takr refrence of field we have to add features defined in useRef
      />
       {/* Added bg-gray-800 for input background color */}
   
   
    <button
    onClick={copyPasswordToClipboard} 
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Copy</button>
  </div>
</div>
<div className='flex justify-center text-sm gap-x-2'> {/* Added justify-center to center the content */}
  <div className='flex items-center gap-x-1'>
    <input type="range" 
    min ={8}
    max={100}
    value={length}
    className='cursor-pointer'
    onChange={(e) => {setLength(e.target.value)}}/>
    <label className='text-white' htmlFor="">Length: {length}</label>
  </div>
  <div className='flex items-center gap-x-1'>
    <input type="checkbox" name="" id="numberInput"
    defaultChecked={numAllowed}
    onChange={() => {
      setNum((prev) => !prev) // true and false will switch 
    }}    
    
    
    />
    <label className='text-white' htmlFor="numberInput">Numbers</label>
  </div>
  <div className='flex items-center gap-x-1'>
    <input type="checkbox" name="" id="charInput"
    defaultChecked={charAllowed}
    onChange={() => {
      setChar((prev) => !prev) // true and false will switch 
    }}    
    
    
    />
    <label className='text-white' htmlFor="charInput">Characters</label>
  </div>
</div>


    </>
  )
}

export default App
