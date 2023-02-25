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
  env.mode = env.mode || "development";
  const isDev = env.mode === "development";

  const config: Configuration = {
    mode: env.mode || "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      preferAbsolute: true,
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    // Error trace
    devtool: isDev ? "inline-source-map" : false,
    devServer: {
      static: "./dist",
      historyApiFallback: true,
      port: env.port || 3000,
      open: true,
      hot: true,
    },
    module: {
      rules: getLoaders(isDev),
    },
    plugins: getPlugins(),
  };

  return config;
};
