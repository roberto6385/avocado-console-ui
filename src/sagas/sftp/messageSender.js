import SFTP from '../../dist/sftp_pb';
import * as PropTypes from 'prop-types';

const sendConnect = (ws, data) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var connect = new SFTP.ConnectRequest();
	connect.setToken(data.token);
	connect.setHost(data.host);
	connect.setUser(data.user);
	connect.setPassword(data.password);
	connect.setPort(data.port);

	// sftp 서버로 alive message 재전송 회수 ( 0 값이면 사용 안 함 )
	connect.setKeepalivecount(2);
	// sftp 서버로 alive message 전송 주기 ( 단위 ms : 1000ms -> 1sec)
	connect.setKeepaliveinterval(60000);

	request.setConnect(connect);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendDisconnect = (ws) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var disconnect = new SFTP.DisconnectRequest();

	request.setDisconnect(disconnect);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByCd = (ws, path) => {
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

const sendCommandByPwd = (ws) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var pwd = new SFTP.PrintWorkingDirectoryRequest();

	cmd.setPwd(pwd);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByMkdir = (ws, path) => {
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

const sendCommandByRmdir = (ws, path) => {
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

const sendCommandByRm = (ws, path) => {
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

const sendCommandByStat = (ws, path) => {
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

const sendCommandByLs = (ws, path) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var ls = new SFTP.ListDirectoryRequest();
	ls.setPath(path);

	cmd.setLs(ls);
	request.setCommand(cmd);
	message.setRequest(request);
	ws.send(message.serializeBinary());
};

const sendCommandByRename = (ws, path, newPath) => {
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

const sendCommandByGet = (ws, path, fileName) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var get = new SFTP.GetRequest();
	get.setPath(path);
	// get.setFilename(fileName);

	cmd.setGet(get);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const upload = (ws, path, uploadFile) => {
	console.log('file size : ', uploadFile.size);

	const uploadFileSize = uploadFile.size;
	const uploadFileName = uploadFile.name;

	const chunkSize = 4 * 1024;
	const fileSlices = [];

	for (let i = 0; i < uploadFileSize; i += chunkSize) {
		(function (start) {
			fileSlices.push({offset: start, length: chunkSize + start});
		})(i);
	}

	const sendBuffer = (data) => {
		var message = new SFTP.Message();
		var request = new SFTP.Request();
		var cmd = new SFTP.CommandRequest();
		var put = new SFTP.PutRequest();
		put.setPath(path);
		// put.setFilename(uploadFileName);
		put.setMode(1);
		put.setFilesize(uploadFileSize);
		put.setData(Buffer.from(data.buffer));
		put.setOffset(1); // 임시로 1로 사용. 실제 offset 값 필요.
		put.setLast(data.last);

		cmd.setPut(put);
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

			var blob = file.slice(slice.offset, slice.length);
			reader.readAsArrayBuffer(blob);
		});
	};

	var total = 0;
	const readFile = (file, slice) => {
		readBytes(file, slice).then((data) => {
			// send protocol buffer
			console.log('read arraybuffer : ', data);
			total += data.byteLength;

			if (0 < fileSlices.length) {
				sendBuffer({buffer: data, last: false});

				readFile(file, fileSlices.shift());
			} else {
				sendBuffer({buffer: data, last: true});
				console.log('file read end. total size : ', total);
			}
		});
	};

	readFile(uploadFile, fileSlices.shift());
};

const messageSender = ({
	keyword,
	ws,
	data,
	path,
	newPath,
	fileName,
	uploadFile,
}) => {
	switch (keyword) {
		case 'Connection':
			sendConnect(ws, data);
			break;

		case 'Disconnection':
			sendDisconnect(ws);
			break;

		case 'CommandByCd':
			sendCommandByCd(ws, path);
			break;

		case 'CommandByPwd':
			sendCommandByPwd(ws);
			break;

		case 'CommandByMkdir':
			sendCommandByMkdir(ws, path);
			break;

		case 'CommandByRmdir':
			sendCommandByRmdir(ws, path);
			break;

		case 'CommandByRm':
			sendCommandByRm(ws, path);
			break;

		case 'CommandByStat':
			sendCommandByStat(ws, path);
			break;

		case 'CommandByLs':
			sendCommandByLs(ws, path);
			break;

		case 'CommandByRename':
			sendCommandByRename(ws, path, newPath);
			break;

		case 'CommandByGet':
			sendCommandByGet(ws, path, fileName);
			break;

		case 'CommandByPut':
			upload(ws, path, uploadFile);
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
