'use strict';

import d3 from 'd3';
import React from 'react';
import { parseNumerics } from './utilities.js';

import colours from './econ_colours.js';

import Header from './header.js';
import Slider from './slider.js';
import ChartContainer from './chart-container.js';

class Chart extends ChartContainer {
  render() {
    return(
      <div className='chart-container'>
        <Header title="Oh geez" subtitle="Seriously now"/>
      </div>
    );
  }
}
var props = {
  height : 320
};

var chart = React.render(<Chart/>, document.getElementById('interactive'));

