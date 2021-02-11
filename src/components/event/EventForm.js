import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext, GameProvider } from "../game/GameProvider";
import { EventContext } from "./EventProvider";

export const EventForm = () => {
  const history = useHistory();
  const { getGames, games } = useContext(GameContext);
  const {createEvent} = useContext(EventContext)
  const [currentEvent, setCurrentEvent] = useState({
    event_time: 0,
    gameId: 0,
    location: "",
    scheduler: localStorage.getItem("lu_token"),
  });

  useEffect(() => {
    getGames();
  }, []);

  const changeEventState = (domEvent) => {
    const newEventState = Object.assign({}, currentEvent);
    newEventState[domEvent.target.name] = domEvent.target.value;
    setCurrentEvent(newEventState);
    console.log(currentEvent)
  };
  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            name="gameId"
            className="form-control"
            value={currentEvent.gameId}
            onChange={changeEventState}
          >
            <option value="0">Select a game...</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>{game.title}</option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
          <label htmlFor="eventTime">Event Time:</label>
          <input type="datetime-local" name="event_time" required autoFocus className="form-control" value={currentEvent.event_time} onChange={changeEventState}/>
      </fieldset>
      <fieldset>
          <label htmlFor="location">Location:</label>
          <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
      </fieldset>

      {/* Create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
            const event = {
                event_time: currentEvent.event_time,
                gameId: parseInt(currentEvent.gameId),
                location: currentEvent.location,
                scheduler: currentEvent.scheduler
            }
            createEvent(event)
            .then(() => history.push("/events"))
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};
