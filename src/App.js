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
          <Route
            path="/:roomName/waiting_room/:userName"
            component={WaitRoom}>
          </Route>
          <Route
            path="/:roomName/game_room/:userName"
            component={GameRoom}>
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
