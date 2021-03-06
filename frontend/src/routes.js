import React from 'react';
import { Router, Route, IndexRoute  } from 'react-router';
import App from './components/App';
import BuilderPage from './components/pages/Builder';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register';
import MembersPage from './components/pages/Members';
import ProjectPage from './components/pages/Project';
import HomePage from './components/pages/Home';
import NotFoundPage from './components/pages/NotFound';
import DashboardPage from './components/pages/Dashboard';
import LogoutPage from './components/pages/Logout';
import ProjectEditImage from './components/pages/ProjectEditImage'
import AuthStore from './stores/AuthStore';

const createBrowserHistory = require('history/lib/createBrowserHistory');

let history = createBrowserHistory();

// Todo: add onEnter={requireAuth} to projects, teams, builder paths!!
// <Router history={history}>
// This will make sure we get logged in everywhere
function requireAuth(nextState, replaceState) {
    if (!AuthStore.isLoggedIn) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
}

var routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="builder"   component={BuilderPage} onEnter={requireAuth}/>
            <Route path="login"     component={LoginPage} />
            <Route path="register"  component={RegisterPage} />
            <Route path="logout"    component={LogoutPage} onEnter={requireAuth} />
            <Route path="dashboard" component={DashboardPage} onEnter={requireAuth} />
            <Route path="organisation/:organisationUUID/members"     component={MembersPage} onEnter={requireAuth} />
            <Route path="organisation/:organisationUUID/project/:projectId"  component={ProjectPage} onEnter={requireAuth} />
            <Route path="organisation/:organisationUUID/project/:projectId/image/:revisionUUID/edit" component={ProjectEditImage} onEnter={requireAuth}/>
            <Route path="*"         component={NotFoundPage} />
        </Route>
    </Router>
);

export default routes;
