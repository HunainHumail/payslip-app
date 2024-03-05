import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.playslips.app',
  appName: 'payslipsApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
