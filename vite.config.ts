import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	console.log('Loaded environment variables:', env);

	return {
		define: {
			'process.env': env,
		},
		plugins: [react()],
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, './src/components'),
				'@features': path.resolve(__dirname, './src/features'),
			}
		}
	};
});