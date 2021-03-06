import styles from './DistributionPicker.scss';

import React, { PropTypes } from 'react';
import Dropdown from '../Dropdown';
import cx from 'classnames';

class DistributionItem extends React.Component {
    handleClick () {
        this.props.onClick(this.props.distribution);
    }

    handleDropdownChange (version) {
        this.props.onVersionChange(version);
    }

    render () {
        var classes = cx(
            styles['DistributionPicker-PickDistribution'],
            this.props.distribution.is_selected ? styles['DistributionPicker-PickDistribution-Selected'] : null
        );

        return (
            <div className={classes} onClick={this.handleClick.bind(this)}>
              <img src={this.props.distribution.logo_url}  />
              <h1>{this.props.distribution.distribution}</h1>
              <Dropdown items={this.props.distribution.versions} isSelected={this.props.distribution.is_selected} onChange={this.handleDropdownChange.bind(this)} />
            </div>
        )
    }
};

DistributionItem.propTypes = {
    distribution: PropTypes.object,
    onClick: PropTypes.func,
    onVersionChange: PropTypes.func
};

DistributionItem.defaultProps = {
    distribution: {
        logo_url: '',
        distribution: ''
    },
    onClick: function() {},
    onChangeVersion: function () {}
};

export default DistributionItem;
