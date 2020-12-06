import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useSink } from './utils/use-sink.utils';
import { Bootstrap } from './ui/bootstrap/bootstrap.component';

const env = {};

const Index = memo(() => {
	const BootstrapC = useSink(() => Bootstrap(env), [Bootstrap]);

	return <BootstrapC />;
});

ReactDOM.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
