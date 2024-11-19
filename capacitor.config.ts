import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'maltechnology.com',
  appName: 'maltechnology',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Http: {
      allowInsecureConnections: true, // Habilita conexiones inseguras
    },
  },
};

export default config;
