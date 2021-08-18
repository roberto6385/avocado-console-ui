import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ResourceGroup from './ResourceGroup';
import Resource from './Resource';
import {ResourceTree} from '../../../styles/components/navigationBar';
import {startSearchingTree} from '../../../utils/searchTree';
import {remoteResourceSelector} from '../../../reducers/remoteResource';

const Resources = ({searchVal}) => {
	const {resourceTree} = useSelector(remoteResourceSelector.all);
	const [filteredNavList, setFilteredNavList] = useState(resourceTree);

	useEffect(() => {
		setFilteredNavList(startSearchingTree(resourceTree, searchVal));
	}, [resourceTree, searchVal]);

	return (
		<ResourceTree>
			{filteredNavList.map((data) =>
				data.type === 'folder' ? (
					<ResourceGroup
						key={data.key}
						open={searchVal !== ''}
						data={data}
						indent={1}
					/>
				) : (
					<Resource key={data.key} data={data} indent={1} />
				),
			)}
		</ResourceTree>
	);
};

Resources.propTypes = {
	searchVal: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default Resources;
