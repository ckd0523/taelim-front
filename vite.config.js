import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs"
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: { "process.env": {} },
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	server: {
		https: {
			key: fs.readFileSync("localhost+3-key.pem"),
			cert: fs.readFileSync("localhost+3.pem")
		},
		host: "localhost",
		proxy: {
			'/api': {
				target: 'http://172.20.21.81:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				secure: false,
				ws: true
			}
		}
	}
});
