import io from 'socket.io-client';
import { useState ,useEffect } from 'react';



const socket = io.connect('http://localhost:3001');


function App() {

  const [name, setName] = useState("");
  const [receivedName, setReceivedName] = useState("");
  const [room, setRoom] = useState("");
  //join room
  const joinRoom = () => {
    socket.emit('join_room', room);
  };
  const sendName = () => {
    console.log(name);
    socket.emit('name',{ name : name , room : room });
  };
  useEffect(() =>{
    socket.on('receivedName', (name) => {
     
      
      setReceivedName(name);
    });

  } , [socket] )
  return (
    <div className="App">
        <input type="text" placeholder="Room" onChange={(e)=>  setRoom(e.target.value)  }   />
        <button onClick={joinRoom}  >Submit</button>
     <input type="text" placeholder="Enter your name" onChange={(e)=>  setName(e.target.value)  }   />
   
      <button onClick={sendName}  >Submit</button>
      <br/>
      <h1> Message </h1>
      <h1>{receivedName}</h1>

    </div>
  );
}

export default App;
