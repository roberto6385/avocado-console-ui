import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './styles/default.css'; //html, body => padding,margin : 0, box-sizing : border-box 로 설정
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css
import 'xterm/css/xterm.css';

import {NotFound, Main, Login, Setting} from './pages';
import AlertPopup from './components/Popup/AlertPopup';
import AddServerForm from './components/Form/AddServerForm';
import ConfirmPopupTemp from './components/Popup/ConfirmPopupTemp';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/setting' component={Setting} />
					<Route path='/' component={Main} />
					<Route component={NotFound} />
				</Switch>
				<AlertPopup />
				<AddServerForm />
				<ConfirmPopupTemp />
			</BrowserRouter>
		);
	}
}

export default App;
