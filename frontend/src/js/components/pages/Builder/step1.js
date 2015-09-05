import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import DistributionPicker from '../../elements/DistributionPicker';
import DockerHubSearch from '../../elements/DockerHubSearch';
import Divider from '../../elements/Divider';
import BuilderActions from '../../../actions/BuilderActions';

class Step1 extends React.Component {
    handleSave () {
        BuilderActions.changeDistribution(this.refs.distribution_picker.state.selected_distribution , this.refs.distribution_picker.state.selected_version);
        BuilderActions.nextPage();
    }

  render() {
    return (
      <div className="BuilderStep1Page">
        {/* Pick Predefined Docker Image */}
        <h1>Pick your base image</h1>
        <DistributionPicker ref="distribution_picker"/>

        <Divider text="Or"/>

        {/* Search docker */}
        <h1>Search Docker Hub</h1>
        <DockerHubSearch/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step1.defaultProps = {
};

Step1.propTypes = {
};

export default Step1;
