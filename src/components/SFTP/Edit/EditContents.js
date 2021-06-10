import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SAVE_EDITTEXT} from '../../../reducers/sftp';
import styled from 'styled-components';
import {AVOCADO_FONTSIZE, LIGHT_BACK_COLOR} from '../../../styles/global';

const _Container = styled.div`
	flex: 1;
	display: inline-block;
	background: black;
	background-size: 100% 32px;
	background-position: left 10px;
	overflow: hidden;
	textarea {
		background: ${LIGHT_BACK_COLOR};
		height: 100%;
		padding: 20px;
		outline: none;
		border: none;
		width: 100%;
		font-size: ${AVOCADO_FONTSIZE};
		resize: none;
	}
`;
const EditContents = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {editText} = corServer;
	const dispatch = useDispatch();

	const writeText = useCallback((e) => {
		const {value} = e.target;
		dispatch({type: SAVE_EDITTEXT, payload: {uuid, editText: value}});
	}, []);

	return (
		<_Container>
			<textarea
				// wrap={JSON.parse(checked) ? 'soft' : 'off'}
				rows='50'
				cols='40'
				value={editText}
				onChange={writeText}
			/>
		</_Container>
	);
};

EditContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditContents;
