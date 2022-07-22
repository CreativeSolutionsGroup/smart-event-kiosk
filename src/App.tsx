import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";

import axios from "axios";
import { CheckInInput, Event, EventInput } from "./models/checkins";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Select } from "@mui/material";
import { EventForm } from "./components/EventForm";

function App() {
  const [studentID, setStudentID] = useState("");
  const [activeEvent, setActiveEvent] = useState<string>("");
  const [newEvent, setNewEvent] = useState<EventInput>();
  const [allEvents, setAllEvents] = useState<Array<Event>>();

  const [showEventForm, setShowEventForm] = useState(true);

  async function getAllEvents() {
    const event_request = await axios.get("/event");
    const events: Array<Event> = event_request.data;

    setAllEvents(events);
  }

  async function sendEvent() {
    const event_response = await axios.post("/event", newEvent);

    setNewEvent({ alias: "" });
    setStudentID("");
    await getAllEvents();
    setActiveEvent(event_response.data);
  }

  async function sendCheckIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const checkin: CheckInInput = {
      student_id: studentID,
      event: activeEvent,
    };

    await axios.post("/checkin", checkin);
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="form">
      <Button
        onClick={(evt) => setShowEventForm(!showEventForm)}
        variant={showEventForm ? "contained" : "outlined"}
        className="hideEventForm"
      >
        Toggle Event Form
      </Button>
      <h1>CU Event Scanner Kiosk</h1>
      <h1>Currently Active: {activeEvent ? allEvents?.find(e => e.id === activeEvent)?.alias : "No Active Event"}</h1>
      {showEventForm ? (
        <EventForm
          events={allEvents!}
          sendEvent={sendEvent}
          setActiveEvent={setActiveEvent}
          activeEvent={activeEvent}
          setNewEvent={setNewEvent}
        />
      ) : null}
      <Card className="formChunk">
        <form className="innerForm" onSubmit={(evt) => sendCheckIn(evt)}>
          <h2>Student Form</h2>
          <label>Student ID</label>
          <TextField
            className="studentID"
            type="text"
            onChange={(evt) => setStudentID(evt.target.value)}
          />
          <Button variant="contained" className="sendID" type="submit">
            Send ID
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default App;
