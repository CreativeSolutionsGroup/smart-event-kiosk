import { Card, TextField, Button, Select } from "@mui/material";
import { PropsWithChildren } from "react";
import { Event } from "../models/checkins";

export const EventForm = ({
  setNewEvent,
  sendEvent,
  setActiveEvent,
  activeEvent,
  events,
}: PropsWithChildren<{
  setNewEvent: Function;
  sendEvent: Function;
  setActiveEvent: Function;
  activeEvent: string;
  events: Event[];
}>) => {
  const parseEvents = () =>
    events?.map((event) => (
      <option value={event.id}>
        {event.alias}
      </option>
    ));

  return (
    <Card className="formChunk">
      <div className="innerForm">
        <h2>Event Form</h2>
        <TextField
          label="New Event Name"
          variant="filled"
          onChange={(evt) => setNewEvent({ alias: evt.target.value })}
          className="eventID"
          type="text"
        />
        <Button
          variant="contained"
          onClick={() => sendEvent()}
          className="createEvent"
        >
          Create Event
        </Button>
        <label>Current Active Event</label>
        <Select
          value={activeEvent}
          onChange={(evt) => setActiveEvent(evt.target.value)}
          className="selectEvent"
          variant="filled"
        >
          <option value="" disabled>
            Select an event
          </option>
          {parseEvents()}
        </Select>
      </div>
    </Card>
  );
};
