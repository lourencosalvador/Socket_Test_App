'use client'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'


export default function Home() {
   const [message, setMessage] = useState("")
   const [box, setBox] = useState<string[]>([])
   const [socket, setSocket] = useState<any>(undefined)

   const handlemessage = () => {
    socket.emit("message", message)
   }

  useEffect(()=> {
    const socket = io("http://localhost:3001")

   socket.on("message", (message) => {
    setBox([...box, message])
   })
    setSocket(socket)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
      >
      { box.map((message: string) => (
        <>
          <h1>{message}</h1>
        </>
         ))}
      </div>
      <input type="text"
      className='text-black'
       onChange={(e) => setMessage(e.target.value)}/>
        
      <button onClick={handlemessage}>Enviar</button>
    </main>
  )
}
