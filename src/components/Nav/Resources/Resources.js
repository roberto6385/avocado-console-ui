import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ResourceGroup from './ResourceGroup';
import Resource from './Resource';
import {ResourceTree} from '../../../styles/components/navigationBar';
import {startSearchingTree} from '../../../utils/searchTree';

const Resources = ({searchVal}) => {
	const {nav} = useSelector((state) => state.common, shallowEqual);
	const [filteredNavList, setFilteredNavList] = useState(nav);

	useEffect(() => {
		setFilteredNavList(startSearchingTree(nav, searchVal));
	}, [nav, searchVal]);

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
