import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { getPlugins } from "./src/shared/config/webpack";
import { getLoaders } from "./src/shared/config/webpack";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

type envType = {
  mode: "development" | "production";
  port: number;
};

export default (env: envType) => {
  const isDev = env.mode === "development";

  const config: Configuration = {
    mode: env.mode || "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    // Error trace
    devtool: isDev ? "inline-source-map" : false,
    devServer: {
      static: "./dist",
      port: env.port || 3000,
      open: true,
      hot: true,
    },
    module: {
      rules: getLoaders(),
    },
    plugins: getPlugins(),
  };

  return config;
};
