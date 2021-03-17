import React, {useState} from 'react';
// import SFTP from '../../dist/sftp_pb';
// import {connection} from './commands/connection';
const SFTP = () => {
	const [uuid, setUuid] = useState('');

	// const onConnection = () => {
	// 	const ws = new WebSocket('ws://211.253.10.9:8080/ws/sftp/protobuf');
	// 	connection(ws);
	// };

	return <div>{/*<button onClick={onConnection}>connection</button>*/}</div>;
};

export default SFTP;
