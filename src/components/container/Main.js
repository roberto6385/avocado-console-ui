import React from 'react';
import styled from 'styled-components';
import {Tabs, Tab} from '@blueprintjs/core';
import SSH_SFTP from './SSH_SFTP';

const Main_Container = styled.div`
	flex: 1;
`;

const Main = () => {
	return (
		<Main_Container>
			main
			{/*<Tabs animate={this.state.animate} id='container/Main-tabs'>*/}
			{/*	<Tab id='rx' title='React' panel={<SSH_SFTP uuid={'uuid'} />} />*/}
			{/*</Tabs>*/}
			{/*<div className='main-header'>main-header (tab)</div>*/}
			{/*<div className='main-body'>main body (ssht, sftp)</div>*/}
		</Main_Container>
	);
};

export default Main;
