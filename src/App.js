import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SiderMenu from './components/SiderMenu/SiderMenu';
import Compose from './containers/Compose/Compose';
import Mail from './containers/Mail/Mail';
import MailBox from './containers/MailBox/MailBox';
import Starred from './containers/Starred/Starred';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <div className="container-sider">
            <SiderMenu />
            <div className="container-nav">
              <NavBar />
              <div className="content">
                <Route exact path={'/inbox'}>
                  <MailBox path="inbox" />
                </Route>
                <Route exact path="/trash">
                  <MailBox path="trash" />
                </Route>
                <Route exact path="/starred" component={Starred} />
                <Route exact path="/compose" component={Compose} />
                <Route exact path="/mail/:id" component={Mail} />
              </div>
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
