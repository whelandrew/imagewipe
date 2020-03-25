import React from 'react';
import ReactDOM from 'react-dom';

import ImageSwiper from './imagesorter.jsx';

ReactDOM.render(
	<div>
		<ImageSwiper />
	</div>,
	document.getElementById('app')
);

module.hot.accept();