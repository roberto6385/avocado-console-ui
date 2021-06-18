import React, {useCallback, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DropDownMenu_Avocado} from '../../styles/default';
import {animation, Item, Separator} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {SSH_SEND_COMMAND_REQUEST} from '../../reducers/ssh';

const SnippetContextMenu = ({setOpen}) => {
	const {t} = useTranslation('snippets');
	const dispatch = useDispatch();

	const {theme, current_tab} = useSelector((state) => state.common);
	const {ssh, snippets} = useSelector((state) => state.ssh);
	const ws = useMemo(() => ssh.find((v) => v.uuid === current_tab).ws, [
		ssh,
		current_tab,
	]);

	const menuEvent = useCallback(
		(v) => () => {
			dispatch({
				type: SSH_SEND_COMMAND_REQUEST,
				data: {
					uuid: current_tab,
					ws: ws,
					input: v.content,
				},
			});
		},
		[current_tab, ws],
	);

	return (
		<DropDownMenu_Avocado
			id={'snippet'}
			animation={animation.slide}
			theme_value={theme}
		>
			<Item
				id='SnippetOpen'
				onClick={() => {
					console.log(current_tab);
					setOpen(true);
				}}
			>
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
};

export default SnippetContextMenu;
