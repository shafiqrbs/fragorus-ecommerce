/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				port: "",
			},
			{
				protocol: "https",
				hostname: "pos.workforcenutritionbd.org",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "pos.workforcenutritionbd.org",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
