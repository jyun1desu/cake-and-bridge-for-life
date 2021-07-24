import Home from './views/Home';
import WaitRoom from './views/WaitRoom';
import GameRoom from './views/GameRoom';
import InvitePage from './views/InvitePage';

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
        <Route path="/w/:roomId/:userID" component={WaitRoom} />
        <Route path="/g/:roomId/:userID" component={GameRoom} />
        <Route path="/i/:roomId" component={InvitePage} />
      </Switch>
    </Router>
    </>
)

export default App;
