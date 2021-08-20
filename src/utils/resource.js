export function getResourceName(resources, key) {
	return resources.find((v) => v.key === key).name;
}

export function getResourceOsType(resources, key) {
	return resources.find((v) => v.key === key).osType;
}

export function getResourceHost(resources, key) {
	return resources.find((v) => v.key === key).host;
}

export function getResourceProtocole(resources, key) {
	return resources.find((v) => v.key === key).protocol;
}

export function getResourcePort(resources, key) {
	return resources.find((v) => v.key === key).port;
}
