import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import Server from './Server';
import Collapse_ from '../../RecycleComponents/Collapse_';
import {arrowDownIcon, arrowRightIcon, folderIcon} from '../../../icons/icons';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	NavigationItemTitle,
	NavigationItem,
} from '../../../styles/components/navigationBar';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';

const Folder = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {selectedResource} = useSelector(remoteResourceSelector.all);

	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);

	const onClickFolderItem = useCallback(() => {
		if (selectedResource === data.key) {
			dispatch(remoteResourceAction.setSelectedResource(null));
		} else {
			dispatch(remoteResourceAction.setSelectedResource(data.key));
		}
	}, [selectedResource, data.key, dispatch]);

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	useEffect(() => {
		setIsFolderUnfolded(open);
	}, [open]);

	return (
		<React.Fragment>
			<NavigationItem
				onClick={onClickFolderItem}
				selected={selectedResource === data.key}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={
						selectedResource === data.key ? 'selected' : undefined
					}
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
