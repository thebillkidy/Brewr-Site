import React from 'react';
import Router from 'react-router';
import routes from './routes';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

import ProjectAPI from './utils/ProjectAPIUtils';

// var rootInstance = null;

// Install the routes
var router = Router.create({
    routes: routes
});
RouterContainer.set(router);
router.run(Handler => React.render(<Handler />, document.body));

// Auto login if possuble
let jwt = localStorage.getItem('jwt');
if(jwt) {
    LoginActions.loginUser(jwt);
}

// // Hot module loading
// if (module.hot) {
//     require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
//         getRootInstances: function () {
//             // Help React Hot Loader figure out the root component instances on the page:
//             return [rootInstance];
//         }
//     });
// }
