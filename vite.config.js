import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	// resolve: {
	//   // alias: {
	//   //   "@": path.resolve("src"),
	//   // },
	//   alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
	// },
	resolve: {
		alias: [
			{ find: '@/', replacement: path.resolve(__dirname, 'src') },
			{
				find: '@/components',
				replacement: path.resolve(__dirname, 'src/components'),
			},
			{ find: '@/assets', replacement: path.resolve(__dirname, 'src/assets') },
		],
	},
});
