import React from 'react';
import ReactDOM from 'react-dom';
import RPSApp from "./RPSApp";

const requests = {play: (p1, p2, observer) => {observer.p1Wins()}}

class App extends React.Component {
    render() {
        return <RPSApp requests={requests}/>
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#app")
)