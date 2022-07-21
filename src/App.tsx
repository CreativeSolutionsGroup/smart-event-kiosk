import { FormEvent, useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import axios from "axios";
import { CheckInInput, Event, EventInput } from './models/checkins';

function App() {
  const [studentID, setStudentID] = useState("");
  const [activeEvent, setActiveEvent] = useState<string>("");
  const [newEvent, setNewEvent] = useState<EventInput>();
  const [allEvents, setAllEvents] = useState<Array<Event>>();

  async function getAllEvents() {
    const event_request = await axios.get("/event");
    const events: Array<Event> = event_request.data;

    setAllEvents(events);
  }

  async function sendEvent() {
    const event_response = await axios.post("/event", newEvent);

    setNewEvent({alias: ""});
    setStudentID("");
    await getAllEvents();
    setActiveEvent(event_response.data);
  }

  async function sendCheckIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const checkin: CheckInInput = {
      student_id: studentID,
      event: activeEvent
    };

    const checkin_response = await axios.post("/checkin", checkin);
  }

  const parseEvents = () => allEvents?.map(event => (
    <option selected={event.id === activeEvent} value={event.id}>
      {event.alias}
    </option>
  ))

  useEffect(() => {
    getAllEvents();
  }, [])

  return (
    <div className="form">
      <button className="hideEventForm">Hide Event Form</button>
      <h1>CU Event Scanner Management</h1>
      <div className="formChunk">
        <h2>Event Form</h2>
        <label>New Event Name</label>
        <input onChange={evt => setNewEvent({ alias: evt.target.value })} className="eventID" type="text"></input>
        <button onClick={() => sendEvent()} className="createEvent">Create Event</button>
        <label>Current Active Event</label>
        <select defaultValue={""} onChange={evt => setActiveEvent(evt.target.value)} className="selectEvent">
          <option value="" disabled>Select an event</option>
          {parseEvents()}
        </select>
      </div>
      <form className="formChunk" onSubmit={evt => sendCheckIn(evt)}>
        <h2>Student Form</h2>
        <label>Student ID</label>
        <input className="studentID" type="text" onChange={(evt) => setStudentID(evt.target.value)}></input>
        <button className="sendID" type="submit">Send ID</button>
      </form>
    </div>
  )
}

export default App
