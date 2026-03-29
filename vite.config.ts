import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// 默认本地开发走 Mock API，不需要 Cloudflare Worker 运行时。
// 只有构建，或显式开启真实 API 开发时，再启用 Cloudflare 插件。
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, '.', '');
  const useRealApi = env.VITE_USE_REAL_API === 'true';
  const shouldUseCloudflare = command !== 'serve' || useRealApi;

  return {
    plugins: shouldUseCloudflare ? [react(), cloudflare()] : [react()],
  };
});
