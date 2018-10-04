import React from "react";

class RPSApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    invalid() {
        this.setState({
            result: 'INVALID!',
        })
    }

    p1Wins() {
        this.setState({
            result: 'Player 1 Wins!',
        })
    }

    p2Wins() {
        this.setState({
            result: 'Player 2 Wins!',
        })
    }

    tie() {
        this.setState({
            result: 'Tie!',
        })
    }

    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submitHandler() {
        this.props.requests.play(
            this.state.player1,
            this.state.player2,
            this,
        )
    }

    render() {
        return <div>
            {this.state.result}
            <input name="player1" onChange={this.inputHandler}/>
            <input name="player2" onChange={this.inputHandler}/>
            <button onClick={this.submitHandler}></button>
        </div>
    }
}

export default RPSApp;