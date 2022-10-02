/** @type {import('next').NextConfig} */
const { i18n } = require("./i18n/next-i18next.config");
const nextConfig = {
	i18n,
	reactStrictMode: true,
	trailingSlash: true,
	output: "standalone",
	images: {
		domains: [
			"images.unsplash.com",
			"demo.joodbooking.com",
			"res.cloudinary.com",
		],
	},
};

module.exports = nextConfig;
