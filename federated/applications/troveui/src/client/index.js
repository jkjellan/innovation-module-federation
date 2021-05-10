import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';

// global styles
import './style.scss';
import "../../node_modules/@lmig/safeco-ui-react/scss/font-lato.scss";

ReactDOM.render(<Root />, document.getElementById('app'));
