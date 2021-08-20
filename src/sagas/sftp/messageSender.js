import SFTP from '../../dist/sftp_pb';
import * as PropTypes from 'prop-types';

// const sendConnect = ({ws, data}) => {
// 	var message = new SFTP.Message();
// 	var request = new SFTP.Request();
// 	var connect = new SFTP.ConnectRequest();
//
// 	console.log(data);
//
// 	connect.setToken(data.token);
// 	connect.setHost(data.host);
// 	connect.setUser(data.user);
// 	connect.setPassword(data.password);
// 	connect.setPort(data.port);
//
// 	// sftp 서버로 alive message 재전송 회수 ( 0 값이면 사용 안 함 )
// 	connect.setKeepalivecount(0);
// 	// sftp 서버로 alive message 전송 주기 ( 단위 ms : 1000ms -> 1sec)
// 	connect.setKeepaliveinterval(60000);
//
// 	request.setConnect(connect);
// 	message.setRequest(request);
//
// 	ws.send(message.serializeBinary());
// };

const sendDisconnect = ({ws}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var disconnect = new SFTP.DisconnectRequest();

	request.setDisconnect(disconnect);
	message.setRequest(request);

	console.log(message);

	ws.send(message.serializeBinary());
};

const sendCommandByCd = ({ws, path}) => {
	console.log(ws, path);
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var cd = new SFTP.ChangeDirectoryRequest();
	cd.setPath(path);

	cmd.setCd(cd);
	request.setCommand(cmd);
	message.setRequest(request);
	console.log(message.serializeBinary());
	ws.send(message.serializeBinary());
};

// const sendCommandByPwd = ({ws}) => {
// 	var message = new SFTP.Message();
// 	var request = new SFTP.Request();
// 	var cmd = new SFTP.CommandRequest();
// 	var pwd = new SFTP.PrintWorkingDirectoryRequest();
//
// 	cmd.setPwd(pwd);
// 	request.setCommand(cmd);
// 	message.setRequest(request);
//
// 	ws.send(message.serializeBinary());
// };

const sendCommandByMkdir = ({ws, path}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var mkdir = new SFTP.MakeDirectoryRequest();
	mkdir.setPath(path);

	cmd.setMkdir(mkdir);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByRmdir = ({ws, path}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var rmdir = new SFTP.RemoveDirectoryRequest();
	rmdir.setPath(path);

	cmd.setRmdir(rmdir);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByRm = ({ws, path}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var rm = new SFTP.RemoveFileRequest();
	rm.setPath(path);

	cmd.setRm(rm);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

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

// const sendCommandByLs = ({ws, path}) => {
// 	var message = new SFTP.Message();
// 	var request = new SFTP.Request();
// 	var cmd = new SFTP.CommandRequest();
// 	var ls = new SFTP.ListDirectoryRequest();
// 	ls.setPath(path);
//
// 	cmd.setLs(ls);
// 	request.setCommand(cmd);
// 	message.setRequest(request);
// 	ws.send(message.serializeBinary());
// };

const sendCommandByRename = ({ws, path, newPath}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var rename = new SFTP.RenameRequest();
	rename.setOldpath(path);
	rename.setNewpath(newPath);

	cmd.setRename(rename);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByGet = ({ws, path}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var get = new SFTP.GetRequest();

	get.setPath(path);

	cmd.setGet(get);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByRead = ({ws, path, offset, length, completed}) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var read = new SFTP.ReadFileRequest();

	console.log(offset);

	read.setPath(path);
	read.setOffset(offset);
	read.setLength(length);
	read.setCompleted(completed);

	cmd.setReadfile(read);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByWrite = ({
	ws,
	path,
	offset,
	length,
	uploadFile,
	completed,
	mode,
	permission,
}) => {
	const sendBuffer = (data) => {
		var message = new SFTP.Message();
		var request = new SFTP.Request();
		var cmd = new SFTP.CommandRequest();
		var write = new SFTP.WriteFileRequest();

		console.log(offset);

		write.setPath(path);
		write.setOffset(offset);
		write.setLength(length);
		write.setData(Buffer.from(data.buffer)); // 파일 전송 데이터.
		write.setCompleted(completed); // 전체 전송 후에는 true로 설정.
		write.setMode(mode); // 처음 파일 전송

		cmd.setWritefile(write);
		request.setCommand(cmd);
		message.setRequest(request);

		ws.send(message.serializeBinary());
	};

	const readBytes = (file, slice) => {
		const reader = new FileReader();

		return new Promise((resolve) => {
			reader.onload = (e) => {
				resolve(e.target.result);
			};
			const blob = file.slice(slice.offset, slice.length);
			reader.readAsArrayBuffer(blob);
		});
	};

	const readFile = (file, slice) => {
		readBytes(file, slice).then((data) => {
			// send protocol buffer
			console.log('read arraybuffer : ', data);
			sendBuffer({buffer: data});
		});
	};

	readFile(uploadFile, {offset, length: length + offset});
};

const messageSender = ({
	keyword,
	ws,
	data,
	path,
	newPath,
	uploadFile,
	offset,
	length,
	completed,
	mode,
	permissions,
}) => {
	switch (keyword) {
		case 'Connection':
			// sendConnect({ws, data});
			break;

		case 'Disconnection':
			sendDisconnect({ws});
			break;

		case 'CommandByCd':
			sendCommandByCd({ws, path});
			break;

		case 'CommandByPwd':
			// sendCommandByPwd({ws});
			break;

		case 'CommandByMkdir':
			sendCommandByMkdir({ws, path});
			break;

		case 'CommandByRmdir':
			sendCommandByRmdir({ws, path});
			break;

		case 'CommandByRm':
			sendCommandByRm({ws, path});
			break;

		case 'CommandByChmod':
			sendCommandByChmod({ws, path, permissions});
			break;
		case 'CommandByStat':
			sendCommandByStat({ws, path});
			break;

		case 'CommandByLs':
			// sendCommandByLs({ws, path});
			break;

		case 'CommandByRename':
			sendCommandByRename({ws, path, newPath});
			break;

		case 'CommandByGet':
			sendCommandByGet({ws, path});
			break;

		case 'CommandByRead':
			sendCommandByRead({ws, path, offset, length, completed});
			break;

		case 'CommandByPut':
			sendCommandByWrite({ws, path, uploadFile});
			break;

		case 'CommandByWrite':
			sendCommandByWrite({
				ws,
				path,
				offset,
				length,
				uploadFile,
				completed,
				mode,
			});
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
