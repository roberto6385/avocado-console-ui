import {all, fork} from 'redux-saga/effects';

// 수정 끝
import commandPwd from './commandPwd';
import connect from './connect';
import disconnect from './disconnect';
import commandLs from './commandLs';
import commandCd from './commandCd';
import commandMkdir from './commandMkdir';
import commandRename from './commandRename';
import reconnect from './reconnect';
import commandRemove from './commandRemove';
import commandRead from './commandRead';
import commandWrite from './commandWrite';
import directorySearch from './directorySearch';
import createSocket from './createSocket';
import deleteSocket from './deleteSocket';

// todo 수정해야하는 목록
import commandStatSaga from './sendCommandStat';
import commandChmodSaga from './sendCommandChmod';

export default function* sftpSaga() {
	yield all([
		fork(connect),
		fork(reconnect),
		fork(disconnect),
		fork(commandPwd),
		fork(commandLs),
		fork(commandCd),
		fork(commandMkdir),
		fork(commandRemove),
		fork(commandRead),
		fork(commandRename),
		fork(commandWrite),
		fork(directorySearch),
		fork(createSocket),
		fork(deleteSocket),

		fork(commandStatSaga),
		fork(commandChmodSaga),
	]);
}
