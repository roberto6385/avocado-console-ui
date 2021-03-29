import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './styles/default.css'; //html, body => padding,margin : 0, box-sizing : border-box 로 설정
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css
// import 'xterm/css/xterm.css';

import {NotFound, Main} from './pages';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' component={Main} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
