import {useState, useEffect} from 'react';

export const useDetectOutsideClick = (el, initialState) => {
	const [isActive, setIsActive] = useState(initialState);

	useEffect(() => {
		const onClick = (e) => {
			// If the active element exists and is clicked outside of
			if (el.current !== null && !el.current?.contains(e.target)) {
				setIsActive(false);
			}
		};

		// If the item is active (ie isOpened) then listen for clicks outside
		if (isActive) {
			document.addEventListener('mousedown', onClick);
			document.addEventListener('touchstart', onClick);
		}

		return () => {
			document.addEventListener('mousedown', onClick);
			document.addEventListener('touchstart', onClick);
		};
	}, [isActive, el]);

	return [isActive, setIsActive];
};
