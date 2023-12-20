import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

const isDevMode = process.env.NODE_ENV === 'development';

const getViteConfig = () => {
	const config: UserConfig = {
		plugins: [react(), svgr({ svgrOptions: { icon: true } }), tsconfigPaths()],
		resolve: {
			alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
		}
	};

	if (isDevMode) {
		config.server = {
			open: true,
			port: 3000
		};
	}

	return config;
};

export default defineConfig(getViteConfig());
