import './App.css';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Home from './components/home/Home';
import MainWindow from './components/Chat/mainwindow/MainWindow'
import Chat from './components/spam/Chat/Chat'
import Join from './components/spam/Join/Join'
import {Redirect} from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

function App() {

  const isAuth = JSON.parse(localStorage.getItem("profile"));

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <Router>
      
      <Route path="/" exact component={Login}/>
      <Route path="/signup" exact component={Signup}/>
    
      <Route path="/Join" exact component={Join}/>
      
      <Route path="/dashboard" component={(props) => ( isAuth ? <MainWindow props={props}/> : <Redirect to="/" />)}/>
      
      </Router>
    </div>
    </QueryClientProvider>
  );
}

export default App;
