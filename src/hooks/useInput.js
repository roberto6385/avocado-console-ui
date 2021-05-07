import {useState, useCallback} from 'react';

const useInput = (initValue = null) => {
	const [value, setValue] = useState(initValue);
	const handler = useCallback((e) => {
		console.log(e.target.value);
		setValue(e.target.value);
	}, []);
	return [value, handler, setValue];
};

export default useInput;
