'use strict';

import d3 from 'd3';
import React from 'react';
import { parseNumerics } from './utilities.js';

import colours from './econ_colours.js';

import Header from './header.js';
import ToggleBarRaw from './toggle-bar.js';
import ChartContainer from './chart-container.js';

import Euromap from './euromap.js';

import { dispatch, createStore } from 'redux';
import { connect, Provider } from 'react-redux';

var initialState = {};
function updateState(state = initialState, action) {
  return {}
};

var store = createStore(updateState);

class Chart extends ChartContainer {
  render() {
    return(
      <div className='chart-container'>
        <Header title="Who’s in, who’s out" subtitle="The groups of Europe"/>
        <Euromap />
      </div>
    );
  }
}
var props = {
  height : 320
};

var chart = React.render(
  <Provider store={store}>
    {() => <Chart {...props} />}
  </Provider>, document.getElementById('interactive'));
