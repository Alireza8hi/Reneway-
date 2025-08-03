import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProfilePage from "./components/profilePage";
import NotFound from "./components/notFound";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer position="top-center" rtl />
        <NavBar user={user} />
        <main className="container">
          <div className="content">
            <Switch>
              <Route path="/register" component={RegisterForm}></Route>
              <Route path="/login" component={LoginForm}></Route>
              <Route
                path="/me"
                render={(props) => (
                  <ProfilePage {...props} user={this.state.user} />
                )}
              ></Route>
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/login" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
