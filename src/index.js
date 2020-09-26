import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './Slider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Slider width="800" height="400" />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
