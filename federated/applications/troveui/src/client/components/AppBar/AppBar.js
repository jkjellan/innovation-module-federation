import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Tooltip,
  Tabs,
  Tab,
  AppBar,
  Toolbar
} from '@material-ui/core';
import Header from '../Header/Header';
import { offerTypes, offersApplicableStatuses } from '../../utils/Constants';
import '@babel/polyfill';

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }, 
  toolbar: {
    minHeight: 56,
    paddingLeft: 16,
  },
});

class SimpleAppBar extends Component {
  handleChange = (event, newValue) => {
    this.props.toggleActiveOfferType(newValue == 0 ? offerTypes.XSELL : offerTypes.UPSELL);
    this.props.collapseCards();
  };

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  render() {
    const { classes, error, activeOfferType, xsellOffersCount, upsellOffersCount } = this.props;    

    return (
      <div className={classes.root}>
        <AppBar>
        <Toolbar id="application-header" className={classes.toolbar}>
          <Header />
        </Toolbar>
        {this.props.offersApplicableStatus === offersApplicableStatuses.APPLICABLE && !error.type &&
          <Tabs variant="fullWidth" id="sell-tools-tabs" value={activeOfferType == offerTypes.UPSELL ? 1 : 0} onChange={this.handleChange} aria-label="Offer Type Tab">
            <Tab
              label={
                <Tooltip id="tooltip-no-xsell" title={!xsellOffersCount ? "No cross-sell offers available" : ""}>
                  <span>Cross-sell</span>
                </Tooltip>
              } disabled={!xsellOffersCount} {...this.a11yProps(0)} />
              <Tab
                label={
                  <Tooltip id="tooltip-no-upsell" title={!upsellOffersCount ? "No upsell offers available" : ""}>
                    <span>Upsell</span>
                  </Tooltip>
                } disabled={!upsellOffersCount} {...this.a11yProps(1)} />
          </Tabs>}
        </AppBar>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);