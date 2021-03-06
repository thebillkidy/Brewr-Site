import styles from '../Input/Input.scss';
import React, { PropTypes } from 'react';
import Input from '../Input/Input.js';
import cx from 'classnames';

export default class ValidateInput extends Input {

    constructor(props) {
        super(props);

        this.state.error_messages = [];
    }

    renderFormGroup (children) {

        var classes = cx(
            styles['Input'],
            this.props.isInline ? styles['Input-Inline'] : null
        );

        return (
            <div className={classes}>
                {children}
                {this.renderErrorMessages()}
            </div>
        );
    }

    /**
     * Renders the error messages
     * @returns {error messages}
     */
    renderErrorMessages() {
        var error_messages = this.state.error_messages;

        if(error_messages) {
            return (
                <ul className="validation-errors">
                    {error_messages.map((message) => {
                        return <li key={message.id}>{message.text}</li>;
                    })}
                </ul>
            )
        }
    }

    /**
     * Add an error message to the component
     * @param message
     */
    addErrorMessage(message) {
        this.state.error_messages.push({id: this.state.error_messages.length, text: message});
        this.forceUpdate();
    }

    /**
     * Remove all error messages from the component
     */
    removeErrorMessages() {
        this.state.error_messages = [];
        this.forceUpdate();
    }

}
