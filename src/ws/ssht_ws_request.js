import {
	SendCommand,
	SendConnect,
	SendDisconnect,
	SendWindowChange,
} from './ssht_ws_logic';

export const ssht_ws_request = ({keyword, ws, data}) => {
	switch (keyword) {
		case 'SendConnect':
			console.log('SendConnect');

			ws.send(
				SendConnect(
					data.token,
					data.host,
					data.user,
					data.password,
					data.port,
				),
			);
			break;

		case 'SendDisconnect':
			console.log('SendDisconnect');
			ws.send(SendDisconnect());
			break;

		case 'SendCommand':
			console.log('SendCommand');
			ws.send(SendCommand(data));
			break;

		case 'SendWindowChange':
			console.log('SendWindowChange');
			ws.send(
				SendWindowChange(data.cols, data.rows, data.width, data.height),
			);
			break;

		default:
			break;
	}
};
