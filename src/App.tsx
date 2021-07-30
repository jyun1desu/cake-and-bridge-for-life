import { useRecoilValue } from 'recoil';
import Home from './views/Home';
import WaitRoom from './views/WaitRoom';
import GameRoom from './views/GameRoom';
import InvitePage from './views/InvitePage';
import { userRoomState, userNameState } from 'store/user';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  const roomId = useRecoilValue(userRoomState);
  const userName = useRecoilValue(userNameState);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/w/:roomId/:userID">
          {roomId && userName ? <WaitRoom /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/g/:roomId/:userID">
          {roomId && userName ? <GameRoom /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/i/:roomId" component={InvitePage} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
