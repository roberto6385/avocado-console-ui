import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {sftpSelector} from '../../../reducers/renewal';
import DropListBlockContainer from './DropListBlockContainer';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	width: 100%;
`;

const DropListContainer = ({uuid}) => {
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);
	return (
		<Container>
			{Object.keys(sftp.files).map((key) => {
				return (
					<DropListBlockContainer
						key={key}
						uuid={uuid}
						blockPath={key}
					/>
				);
			})}
		</Container>
	);
};

DropListContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};
export default DropListContainer;
