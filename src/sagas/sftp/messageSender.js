import SFTP from '../../dist/sftp_pb';
import * as PropTypes from 'prop-types';

const sendCommandByStat = ({ws, path}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var stat = new SFTP.StatusRequest();
	stat.setPath(path);

	cmd.setStat(stat);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};
const sendCommandByChmod = ({ws, path, permissions}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var chmod = new SFTP.ChangeModeRequest();
	console.log(path);
	console.log(permissions);
	chmod.setPath(path);
	chmod.setPermissions(permissions);

	cmd.setChmod(chmod);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const messageSender = ({keyword, ws, path, permissions}) => {
	switch (keyword) {
		case 'CommandByChmod':
			sendCommandByChmod({ws, path, permissions});
			break;
		case 'CommandByStat':
			sendCommandByStat({ws, path});
			break;

		default:
			break;
	}
};

messageSender.propTypes = {
	keyword: PropTypes.string.isRequired,
	ws: PropTypes.object.isRequired,
	data: PropTypes.object,
	uploadFile: PropTypes.object,
	token: PropTypes.string,
	path: PropTypes.string,
	newPath: PropTypes.string,
	fileName: PropTypes.string,
};

export default messageSender;
