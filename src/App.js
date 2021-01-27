import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SiderMenu from './components/SiderMenu/SiderMenu';
import Inbox from './containers/Inbox/Inbox';
import Mail from './containers/Mail/Mail';
import Trash from './containers/Trash/Trash';

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
                <Route exact path={'/inbox'} component={Inbox} />
                <Route exact path="/trash" component={Trash} />
                <Route exact path="/mail/:id" component={Mail} />
                <Route exact path={'/'} component={Inbox} />
              </div>
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
