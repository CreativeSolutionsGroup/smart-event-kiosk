import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [studentID, setStudentID] = useState("");
  function sendCheckIn() {
    alert(studentID);
  }
  return (
    <div className="form">
      <button className="hideEventForm">Hide Event Form</button>
      <h1>CU Event Scanner Management</h1>
      <div className="formChunk">
        <h2>Event Form</h2>
        <label>New Event ID</label>
        <input className="eventID" type="text"></input>
        <button className="createEvent">Create Event</button>
        <label>Current Active Event</label>
        <select className="selectEvent">
          <option>Select an event</option>
        </select>
      </div>
      <div className="formChunk">
        <h2>Student Form</h2>
        <label>Student ID</label>
        <input className="studentID" type="text" onChange={(evt) => setStudentID(evt.target.value)}></input>
        <button className="sendID" type="button" onClick={(() => sendCheckIn())}>Send ID</button>
      </div>
    </div>
  )
}

export default App
