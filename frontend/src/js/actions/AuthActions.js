import AppDispatcher from '../dispatchers/AppDispatcher';
import * as AuthAPIUtils from '../utils/AuthAPIUtils';
import * as actionTypes from '../constants/ActionTypes';

/**
 * This action creator is the gateway between the server and the view!
 * Here we will push the event towards the view stack and call the server side
 * upon receiving a response from the server (in the api util), we will trigger
 * a server side event. These are then forwarded to the ServerActionCreators
 */
module.exports = {
    login: function (email, password) {
        // Dispatch the login event on the view
        AppDispatcher.handleViewAction({
            type: actionTypes.REQUEST_LOGIN,
            email: email,
            password: password
        });

        // login the user
        AuthAPIUtils.login(email, password);
    }
};