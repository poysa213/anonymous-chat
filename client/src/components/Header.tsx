'use client'
import React, {useState} from 'react'
import Popup from './PopUp'
import { useRouter } from 'next/navigation'

export const Header = () => {
    const [joinMeet, setJoin] = useState(false)
    const router = useRouter()
    // const [username, setUsername] = useState("")
    const [roomID, setRoomID] = useState("")

     function generateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
        
        for (let i = 0; i < 11; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
         
        //   if (i === 2 || i === 5) {
        //     result += '-';
        //   }
        }
        
        return result;
      }

    //   function checkStringFormat(str:string) {
    //     const pattern = /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/;
    //     return pattern.test(str);
    //   }
      
    
     const newRoom = (e:any) => {
        const ID = generateRandomString()
        router.push(`/chat/${ID}`)
        
    }
    const joinRoom = () => {
        // if (checkStringFormat(roomID)){
          if(roomID.length == 10 ){
        router.push(`/chat/${roomID}`)
          }else{
            alert("The length of RoomId should be 10!")
          }
        // }
    }
    const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const inputValue = e.target.value;
      console.log(inputValue)
      console.log(inputValue.length)
      if (inputValue.length  <= 10){
        setRoomID(e.target.value)
      }
      else{
        alert("The length of RoomId should be 10!")
      }
    }
    
  return (
    <div className='flex flex-col justify-center items-center w-full borde h-[70vh]'>
        <h1 className='font-extrabold text-7xl'>Anonymous <span className='text-blue-300'>Chat</span></h1> 
        <p className='text-5xl'>Connect with someone special anonymously</p>
        <p className='text-4xl'>Chat with a mystery companion</p>
        
        <div className='py-10'>
            <button  onClick={newRoom} className='bg-blue-500 text-white px-12 py-2 border-neutral-50 hover:bg-blue-950  transition-shadow m-2 font-bold'>New</button>
            <button onClick={() => setJoin(true)}  className='bg-blue-400 text-white px-12 py-2 border-neutral-50 hover:bg-blue-950  transition-shadow m-2 font-bold'>Join</button>
        </div>

        <Popup isOpen={joinMeet} setIsOpen={setJoin} >
        <div className="flex flex-col justify-center">
       
            <label  className='mb-2 text-customGray text-base text-white'>Room ID</label>
        <input 
          required
           type="text" 
           placeholder="dsf5eEe489" 
           value={roomID}
           onChange={(e) => handleRoomIdChange(e)}
           className='p-1.5 border-2 border-brand rounded-md placeholder-[#E0E0E0] placeholder:text-sm focus:outline-none focus:border-[3px] md:p-2.5' 
           />
            <button onClick={joinRoom}  className='bg-blue-500 text-white px-12 py-2 border-neutral-50 hover:bg-blue-950  transition-shadow my-2 font-bold'>Join</button>
           </div>
           
       </Popup>
        </div>
  )
}
