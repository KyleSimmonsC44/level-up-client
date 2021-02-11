import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { GameTypeContext } from "../gameType/GameTypeProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { getGameTypes, gameTypes } = useContext(GameTypeContext)
    const { createGame } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        numberOfPlayers: 0,
        gamerId: localStorage.getItem("lu_token"),
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const changeGameState = (domEvent) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                    <select onChange={changeGameState} name="gameTypeId">
                        <option>What Kind of Game?</option>
                        {
                            gameTypes.map(type => <option key={type.id} value={type.id}>{type.label}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        gamerId: localStorage.getItem("lu_token"),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}