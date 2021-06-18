import React, {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DropDownMenu_Avocado} from '../../styles/default';
import {animation, Item, Separator} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {SSH_SEND_COMMAND_REQUEST} from '../../reducers/ssh';

const SnippetContextMenu = ({uuid, setOpen}) => {
	const {t} = useTranslation('snippets');
	const dispatch = useDispatch();

	const {theme} = useSelector((state) => state.common);
	const {ssh, snippets} = useSelector((state) => state.ssh);
	const ws = useRef(ssh.find((v) => v.uuid === uuid).ws);

	const menuEvent = useCallback(
		(v) => () => {
			dispatch({
				type: SSH_SEND_COMMAND_REQUEST,
				data: {
					uuid: uuid,
					ws: ws.current,
					input: v.content,
				},
			});
		},
		[uuid, ws],
	);

	return (
		<DropDownMenu_Avocado
			id={'snippet'}
			animation={animation.slide}
			theme_value={theme}
		>
			<Item id='SnippetOpen' onClick={() => setOpen(true)}>
				{t('editSnippets')}
			</Item>
			<Separator />
			{snippets.map((v, i) => {
				return (
					<Item key={i} id={v.name} onClick={menuEvent(v)}>
						{v.name}
					</Item>
				);
			})}
		</DropDownMenu_Avocado>
	);
};

SnippetContextMenu.propTypes = {
	setOpen: PropTypes.func.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default SnippetContextMenu;
