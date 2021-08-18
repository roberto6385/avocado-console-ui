import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Folder from './Folder';
import Server from './Server';
import {_Nav} from '../../../styles/components/navigationBar';
import {startSearchingTree} from '../../../utils/searchTree';
import {remoteResourceSelector} from '../../../reducers/remoteResource';

const ServerFolderList = ({searchVal}) => {
	const {resourceTree} = useSelector(remoteResourceSelector.all);
	const [filteredNavList, setFilteredNavList] = useState(resourceTree);

	useEffect(() => {
		setFilteredNavList(startSearchingTree(resourceTree, searchVal));
	}, [resourceTree, searchVal]);

	return (
		<_Nav>
			{filteredNavList.map((data) =>
				data.type === 'folder' ? (
					<Folder
						key={data.key}
						open={searchVal !== ''}
						data={data}
						indent={1}
					/>
				) : (
					<Server key={data.key} data={data} indent={1} />
				),
			)}
		</_Nav>
	);
};

ServerFolderList.propTypes = {
	searchVal: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default ServerFolderList;
