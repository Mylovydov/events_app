import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";

const isDevMode = process.env.NODE_ENV === "development";
const envDir = path.resolve(__dirname, "..");

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, envDir, "");
	const PORT = +(env.CLIENT_PORT || 3000);

	const config: UserConfig = {
		plugins: [react(), svgr({ svgrOptions: { icon: true } }), tsconfigPaths()],
		resolve: {
			alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
		},
		preview: {
			port: PORT,
		},
		define: {
			"import.meta.env.VITE_SERVER_URL": JSON.stringify(env.SERVER_URL),
		},
	};
	if (isDevMode) {
		config.server = {
			open: true,
			port: PORT
		};
	}


	return config;
});
