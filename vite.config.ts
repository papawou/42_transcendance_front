import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // loads env var from .env file

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: true
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		}
	}
})