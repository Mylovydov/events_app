import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// const PORT = import.meta.env.VITE_PORT || 3000;

export default defineConfig({
	plugins: [react(), svgr(), tsconfigPaths()],
	server: {
		open: true,
		port: 3000
	}
});
