import logo from './logo.svg';
import './App.css';
import ProductFeed from './ProductFeed';
import Checkout from './Checkout';
import ProductDetails from './ProductDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

// HOC
const PrivateRoute = (props) => {
  const { path, Component, ...restProps } = props;

  return <Route
    exact
    path={path}
    {...restProps}
    render={(routeProps) => {

      if(localStorage.getItem('token') != undefined){
        return <Component {...routeProps} />
      } else {
        window.location.href = '/users/login'
      }

    }}
  />
}

// HOC
const AuthRoute = (props) => {
  const { path, Component, ...restProps } = props;

  return <Route
    exact
    path={path}
    {...restProps}
    render={(routeProps) => {

      if(localStorage.getItem('token') != undefined){
        window.location.href = '/'
      } else {
        return <Component {...routeProps} />
      }
    }}
  />
}


function App() {
  return (
    <Router>
      <Switch>

        {/* only if user not logged in  */}
        <AuthRoute exact path="/users/login" Component={Login} />
        <AuthRoute exact path="/users/signup" Component={Signup} />

        {/* only if user is logged in */}
        <PrivateRoute exact path="/" Component={ProductFeed} />
        <PrivateRoute exact path="/cart/checkout" Component={Checkout} />
        <PrivateRoute exact path="/product/:productID" Component={ProductDetails} />

      </Switch>
    </Router>
  );
}

export default App;
