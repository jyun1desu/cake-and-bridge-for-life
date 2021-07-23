import Home from './views/Home';
import WaitRoom from './views/WaitRoom';
import GameRoom from './views/GameRoom';

import {
  HashRouter as Router,
  Switch,
  Route,
  // Redirect
} from "react-router-dom";

const App = () => (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/w/:roomName/:userID" component={WaitRoom} />
        <Route path="/g/:roomName/:userID" component={GameRoom} />
      </Switch>
    </Router>
    </>
)

export default App;
