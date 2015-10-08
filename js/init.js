'use strict';

import d3 from 'd3';
import React from 'react';
import { Im, parseNumerics } from './utilities.js';

import colours from './econ_colours.js';

import Header from './header.js';
import ToggleBarRaw from './toggle-bar.js';
import ChartContainer from './chart-container.js';

import Euromap from './euromap.js';

import { dispatch, createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const CHANGE_HIGHLIGHT = 'CHANGE_HIGHLIGHT';
function changeHighlight(highlight) {
  return {
    type : CHANGE_HIGHLIGHT,
    highlight
  };
}
function highlightReducer(state = 'none', action) {
  if(action.type !== CHANGE_HIGHLIGHT) { return state; }
  return action.highlight;
}

var initialState = {
  highlight : 'none'
};
function updateState(state = initialState, action) {
  return {
    highlight : highlightReducer(state.highlight, action)
  }
};

function connectMap(map) {
  return connect(function(state) {
    var r = _.mapValues(map, (v,k) => {
      var keys = v.split('.'), s = state;
      while(k=keys.shift()) {
        if(!s) { break; }
        s = s[k];
      }
      return s;
    });
    return r;
  });
}

var ToggleBar = connectMap({ value : 'highlight' })(ToggleBarRaw);

var store = createStore(updateState);

class Chart extends ChartContainer {
  render() {
    var toggleProps = {
      items : [
        { title : 'All', key : 'none', value : 'none' },
        { title : 'Eurozone', key: 'euro', value : 'euro' },
        { title : 'European Union', key : 'EU', value : 'EU' },
        { title : 'Schengen Zone', key : 'schengen', value : 'schengen' }
      ],
      action : (v) => { store.dispatch(changeHighlight(v)); }
    };

    return(
      <div className='chart-container'>
        <Header title="Who’s in, who’s out" subtitle="The groups of Europe"/>
        <ToggleBar {...toggleProps} />
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
