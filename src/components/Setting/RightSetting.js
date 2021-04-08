import React from 'react';

import General from './General';
import Terminal from './Terminal';
import SFTP from './SFTP';
import {OutlineCol} from '../../styles/common';

const RightSetting = () => {
	return (
		<OutlineCol flex={1} className={'fix-height'}>
			<General />
			<Terminal />
			<SFTP />
		</OutlineCol>
	);
};

export default RightSetting;
