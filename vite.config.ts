import react from '@vitejs/plugin-react';
import { dirname } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  // Sharing an environment file across your Mono-Repo | by Josh Dando | Medium
  // https://medium.com/@dandobusiness/sharing-a-an-environment-file-across-your-mono-repo-ba06af1229ee
  const { findUp } = await import('find-up');
  const pathToEnvFile = await findUp(process.env.ENV_FILE || '.env');
  const envDir = pathToEnvFile ? dirname(pathToEnvFile) : undefined;

  return {
    // The directory from which .env files are loaded
    // https://vitejs.dev/config/#envdir
    envDir,

    plugins: [react()],

    server: {
      https: true,
    },

    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
  };
});
