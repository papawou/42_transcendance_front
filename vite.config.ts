import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const fullReloadAlways: PluginOption = {
	name: 'full-reload-always',
	handleHotUpdate({ server }) {
	  server.ws.send({ type: "full-reload" })
	  return []
	},
  } as PluginOption

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: true,
		watch: {
			usePolling: true
		  }
	},
	plugins: [react(), fullReloadAlways],
	resolve: {
		alias: { 
			'@': path.resolve(__dirname, './src'),
		}
	}
})