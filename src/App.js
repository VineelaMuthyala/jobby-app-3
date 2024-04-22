import {Redirect, BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginRoute from './Components/LoginRoute'
import HomeRoute from './Components/HomeRoute'
import JobsRoute from './Components/JobsRoute'
import JobCardRoute from './Components/JobCardRoute'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFoundRoute from './Components/NotFoundRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exaxt path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobCardRoute} />
      <Route path="/not-found" component={NotFoundRoute} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)
export default App
