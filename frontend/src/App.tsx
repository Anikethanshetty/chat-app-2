import { useEffect, useRef, useState } from "react"

function App() {

  const [message,setMessage] = useState(["hello","hi"])
  const inputRef = useRef<HTMLInputElement | null>(null)
 
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080")

    ws.onmessage = (event)=>{

      //@ts-ignore
      setMessage(m => [...m,event.data])
    }

    return () => {
      ws.close()
    }
  },[])

  const sendMessage = ()=>{
   
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-between">
  <div className="bg-slate-500 flex-grow-[9.5] flex flex-col items-start p-4 pt-8 space-y-12 overflow-y-auto">
    {message.map((msg, index) => (
      <div key={index}>
        <span className="bg-white text-black rounded-lg p-4">
          {msg}
        </span>
      </div>
    ))}
  </div>
  <div className="flex-grow-[.5] flex pl-[36vw]">
    <div className="relative w-[26vw] mt-6">
      <input 
        type="text" 
        className="p-4 h-10 w-full pr-[9vw] rounded-lg text-black font-mono" 
        placeholder="Type your message here..."
        ref={inputRef}
      />
      <button 
        className="bg-slate-800 h-10 w-[8vw] font-semibold absolute right-0 top-0"onClick={sendMessage} 
      >
        Send
      </button>
    </div>
  </div>
</div>

  )
}

export default App
