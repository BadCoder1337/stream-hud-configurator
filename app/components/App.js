import React from "react";
import * as B from "react-bootstrap";
import Preview from "./Preview";
import Start from "./Start";
import Configurator from "./Configurator";
import TwitchVote from "./TwitchVote";
import VoteHud from "./VoteHud"

const domain = 'http://localhost:8080'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkHud: `${domain}/hud/hud?title=TEAM1%2CTEAM2&logo=img%2Fdefault.jpg%2Cimg%2Fdefault.jpg&esl=1&name=TEST%20TOURNAMENT&score=0%2C0`,
            linkVote: `${domain}/vote/?title=TEAM1%2CTEAM2&logo=img%2Fdefault.jpg%2Cimg%2Fdefault.jpg&name=Vote%20Fin%20chat`,
            league: null,
            name: localStorage.channels ? `twitch.tv/${localStorage.channels.split(',').join(', twitch.tv/')}` : 'Vote in chat',
            title: [
                "TEAM1", "TEAM2"
            ],
            logo: ["img/default.jpg", "img/default.jpg"]
        };
        this.defaultState = this.state;
    }

    submitLeague = id => {
        this.setState({league: id});
        console.log("League ", id, " submited");
    }

    resetState = () => {
        this.setState(this.defaultState);
    }

    updateHudLink = (conf) => {
        this.setState({
            title: conf.title,
            logo: conf.logo,
            linkHud: `${domain}/hud/hud?${Object.entries(conf).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')}`,
            linkVote: `${domain}/vote/?${Object.entries({title: conf.title, logo: conf.logo, name: this.state.name}).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')}`
        });
    }
    updateVoteLink = (conf) => {
        this.setState({
            name: conf,
            linkVote: `${domain}/vote/?${Object.entries({title: this.state.title, logo: this.state.logo, name: conf}).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')}}`
        })
    }
    render() {
        switch (this.state.league) {
            case null:
                return (
                  <div>
                    <Preview link={this.state.linkHud} />
                    <br />
                    <Start submitLeague={this.submitLeague} />
                  </div>
                )
                // case -1:
            default:
                return (
                  <div>
                    <B.Button onClick={this.resetState} bsStyle="danger">Reset</B.Button>
                    <Preview link={this.state.linkHud} />
                    <br />
                    <Configurator
                      pushConf={this.updateHudLink}
                      logo={this.state.logo}
                      title={this.state.title}
                      league={this.state.league}
                    />
                    <br />
                    <TwitchVote
                      title={this.state.title}
                      pushConf={this.updateVoteLink}
                      name={this.state.name}
                    />
                    <br />
                    <VoteHud link={this.state.linkVote} />
                  </div>
                )
        }
    }
}
export default App;
