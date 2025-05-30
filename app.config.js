import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    name: "EXtrack",
    slug: "my-expence-tracker",
    version: "1.0.0",
    scheme: "my-expence-tracker",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.myexpence.expo"
    },
    android: {
      edgeToEdgeEnabled: false,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.myexpence.expo"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      ["expo-dev-launcher", { launchMode: "most-recent" }]
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: "f2af5ee2-d3a6-4b83-8b1b-7fee94184cb5"
      }
    }
  };
};
