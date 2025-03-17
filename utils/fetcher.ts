import { auth } from "./auth";

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;
const API_VALUE = process.env.API_VALUE;

export async function fetcher(endpoint: string, options = {}) {
	const session = await auth();

	if (endpoint !== "/splash" && (!session?.license || !session?.activeKey)) {
		throw new Error("No valid session");
	}

	const headers = {
		"Content-Type": "application/json",
		"X-API-KEY": API_KEY,
		"X-API-VALUE": API_VALUE,
		"X-API-SECRET": session?.activeKey || "",
		...options.headers,
	};

	const config = {
		method: "GET",
		...options,
		headers,
	};

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, config);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error(`Fetch error: ${(error as Error)?.message}`);
		throw error;
	}
}
