import Home from './views/Home';
import WaitRoom from './views/WaitRoom';
import GameRoom from './views/GameRoom';

import {
  HashRouter as Router,
  Switch,
  Route,
  // Redirect
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:roomName/waiting_room/:userID" component={WaitRoom} />
        <Route path="/:roomName/game_room/:userID" component={GameRoom} />
      </Switch>
    </Router>

  )
}

export default App;
