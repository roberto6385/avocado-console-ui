// 복사방지
export const PreventDragCopy = `
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

// 스크롤 숨기기
export const HiddenScroll = `
-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;
