import fa from 'font-awesome/css/font-awesome.css';
import styles from './Dropdown.scss';

import React, {PropTypes } from 'react';
import cx from 'classnames';

class Dropdown extends React.Component {
    handleChange (el) {
        this.props.onChange(this.refs.dropdownOption.getDOMNode().value);
    }

    render() {
        var self = this;
        var options = [];

        this.props.items.forEach((item, index) => {
            options.push(<option key={"dropdown_option_" + index} value={item.value} selected={item.isSelected}>{item.name}</option>);
        });

        var className = cx(
            styles['Dropdown'],
            this.props.isSelected ? 'Dropdown-Selected' : null
        );

        return (
            <div className={className}>
                <select onChange={self.handleChange.bind(self)} ref="dropdownOption">
                  {options}
                </select>
            </div>
        );
    }
};

Dropdown.propTypes = {
    items: PropTypes.array,
    isSelected: PropTypes.bool, // Is the current selectdown box selected (different color)
    onChange: PropTypes.func
};

Dropdown.defaultProps = {
    items: [],
    isSelected: false
};

export default Dropdown;
