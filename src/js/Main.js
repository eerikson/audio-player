/*
*  Main.js
*
*  Main application entry point.
*/

import Player from './application/Player';
import React from 'react';
import { render } from 'react-dom';
import { DEBUG } from './application/Utilities/Constants.js';

const appEl = document.querySelector('#js-app');

render( <Player playbackUrl={DEBUG.AUDIO_URL} />, appEl );