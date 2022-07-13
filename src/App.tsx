import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [studentID, setStudentID] = useState("");
  function sendCheckIn() {
    alert(studentID);
  }
  return (
    <div className="eventForm">
      <button className="hideEventForm"></button>
      <input className="eventID"></input>
      <button className="createEvent"></button>
      <select className="selectEvent"></select>
      <input className="studentID" onChange={(evt) => setStudentID(evt.target.value)}></input>
      <button className="sendID" type="button" onClick={(() => sendCheckIn())}></button>
    </div>
  )
}

export default App
