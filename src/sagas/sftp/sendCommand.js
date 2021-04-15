import {all, call, fork, take, takeLatest} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {PWD_REQUEST} from '../../reducers/sftp/index';
import sftp_ws from '../../ws/sftp_ws';

function* sendCommand(action) {
	const {type, payload} = action;
	const channel = payload.channel;
	console.log(type, payload);
	switch (type) {
		case PWD_REQUEST:
			yield call(sftp_ws, {
				keyword: 'CommandByPwd',
				ws: payload.socket,
			});
			break;
		default:
			break;
	}

	try {
		while (true) {
			const data = yield take(channel);

			if (data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(data);

				if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
					const response = message.getResponse();
					console.log('response status: ', response.getStatus());
					if (
						response.getResponseCase() ===
						SFTP.Response.ResponseCase.COMMAND
					) {
						const command = response.getCommand();

						switch (command.getCommandCase()) {
							// case SFTP.CommandResponse.CommandCase.CD :  {
							//
							//     const cd = command.getCd();
							//     console.log("command : cd", cd);
							//     break;
							// }
							case SFTP.CommandResponse.CommandCase.PWD: {
								const pwd = command.getPwd();
								console.log('command : pwd', pwd);

								// this.setState({
								//     result: pwd.getMessage()
								// });
								break;
							}
							// case SFTP.CommandResponse.CommandCase.CHGRP : {
							//
							//     const chgrp = command.getChgrp();
							//     console.log("command : chgrp", chgrp);
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.CHOWN : {
							//
							//     const chown = command.getChown();
							//     console.log("command : chown", chown);
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.CHMOD : {
							//
							//     const chmod = command.getChmod();
							//     console.log("command : chmod", chmod);
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.MKDIR : {
							//
							//     const mkdir = command.getMkdir();
							//     console.log("command : mkdir", mkdir);
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.RMDIR : {
							//
							//     const rmdir = command.getRmdir();
							//     console.log("command : rmdir", rmdir);
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.RM : {
							//
							//     const rm = command.getRm();
							//     console.log("command : rm", rm);
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.RENAME : {
							//
							//     const rename = command.getRename();
							//     console.log("command : rename", rename);
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.LN : {
							//
							//     const ln = command.getLn();
							//     console.log("command : ln", ln);
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.LS : {
							//
							//     const ls = command.getLs();
							//     console.log("command : ls", ls);
							//
							//     const entryList = ls.getEntryList();
							//     console.log("entry ", entryList.length )              ;
							//
							//     var result = "";
							//
							//     for (var i=0; i < entryList.length; i++) {
							//         const entry = entryList[i];
							//         console.log("entry : ", entry.getLongname());
							//         result += entry.getLongname() + "\n";
							//     }
							//
							//     this.setState({
							//         result : result
							//     });
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.STAT : {
							//
							//     const stat = command.getStat();
							//     console.log("command : stat", stat);
							//
							//     this.setState({
							//         result: stat.getUid() + ", " + stat.getGid() + ", " + stat.getPermissions() + ", " + stat.getMtime() + ", " + stat.getSize()
							//     });
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.LSTAT : {
							//
							//     const lstat = command.getLstat();
							//     console.log("command : lstat", lstat);
							//
							//     this.setState({
							//         result: lstat.getUid() + ", " + lstat.getGid() + ", " + lstat.getPermissions() + ", " + lstat.getMtime() + ", " + lstat.getSize()
							//     });
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.PUT : {
							//
							//     const put = command.getPut();
							//     console.log("command : put", put);
							//
							//     this.setState({
							//         progress: put.getProgress()
							//     });
							//     break;
							// }
							// case SFTP.CommandResponse.CommandCase.GET : {
							//
							//     const get = command.getGet();
							//     console.log("command : get", get);
							//
							//     const data = get.getData_asU8();
							//     this.fileBuffer = this.appendBuffer(this.fileBuffer, data);
							//
							//     // 프로그래스바
							//     var sum = this.state.getReceiveSum + data.length;
							//     const percent = sum * 100 / get.getFilesize();
							//
							//     this.setState({
							//         getReceiveSum : sum,
							//         progress : percent
							//     });
							//
							//     if ( get.getLast() === true ) {
							//
							//         const blob = new Blob([this.fileBuffer]);
							//
							//         this.fileBuffer = new ArrayBuffer(0);
							//
							//         var url = URL.createObjectURL(blob);
							//
							//         var a = document.createElement("a");
							//         document.body.appendChild(a);
							//         a.style = "display: none";
							//         a.href = url;
							//         a.download = this.state.getFileName;
							//         a.click();
							//         window.URL.revokeObjectURL(url);
							//
							//         this.setState({
							//             getReceiveSum : 0,
							//             getProgress : 0
							//         });
							//     }
							//     break;
							// }
						}
					}
				}
			}
		}
	} catch (err) {
		//
	}
}

function* watchSendCommand() {
	yield takeLatest(PWD_REQUEST, sendCommand);
}

export default function* commandSaga() {
	yield all([fork(watchSendCommand)]);
}
