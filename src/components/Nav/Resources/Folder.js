import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import Server from './Server';
import {
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../../reducers/common';
import Collapse_ from '../../RecycleComponents/Collapse_';
import {arrowDownIcon, arrowRightIcon, folderIcon} from '../../../icons/icons';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	NavigationItemTitle,
	NavigationItem,
} from '../../../styles/components/navigationBar';

const Folder = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server} = useSelector((state) => state.common, shallowEqual);

	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);

	const onClickFolderItem = useCallback(() => {
		if (clicked_server === data.key) {
			dispatch({type: SET_CLICKED_SERVER, payload: null});
		} else {
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
		}
	}, [clicked_server, data.key, dispatch]);

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	const onDragStartFolder = useCallback(() => {
		dispatch({type: SET_CLICKED_SERVER, payload: data.key});
	}, [data.key, dispatch]);

	const onDropFolder = useCallback(
		(e) => {
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({
					type: SORT_SERVER_AND_FOLDER,
					payload: {next: data, indent: parseInt(indent)},
				});
		},
		[data, dispatch, indent],
	);

	useEffect(() => {
		setIsFolderUnfolded(open);
	}, [open]);

	return (
		<React.Fragment>
			<NavigationItem
				onClick={onClickFolderItem}
				draggable='true'
				onDragStart={onDragStartFolder}
				onDrop={onDropFolder}
				selected={clicked_server === data.key ? true : false}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={clicked_server === data.key ? 'selected' : undefined}
				>
					{folderIcon}
				</Icon>

				<NavigationItemTitle>{data.name}</NavigationItemTitle>
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickFoldOrUnfoldFolder}
				>
					{isFolderUnfolded ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</NavigationItem>
			{data.contain.length !== 0 && (
				<Collapse_ open={isFolderUnfolded}>
					<React.Fragment>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<Folder
									key={i.key}
									open={open}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<Server
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</Collapse_>
			)}
		</React.Fragment>
	);
};

Folder.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Folder;
