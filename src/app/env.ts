const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const noAuth = import.meta.env.VITE_NO_AUTH as boolean;

const backendThresh: string = import.meta.env.VITE_BACKEND_URL_THRESH as string;
// const backendDarius: string = import.meta.env.VITE_BACKEND_URL_DARIUS as string;
// const backendBulbasaur: string = import.meta.env.VITE_BACKEND_URL_BULBASAUR as string;

const apiEndpoint = (path: string) => path + '/api'; // Todo: Add versioning

const url = {
	thresh: {
		base: apiEndpoint(backendThresh ?? backendUrl + '/thresh'),
		isDev: backendThresh == null
	},
	// Todo: Add more endpoints here
}

if (
	backendUrl == undefined ||
	noAuth == undefined
) {
	throw new Error("Environment variables are not set properly");
}

export {
	backendUrl,
	noAuth,
	url
};