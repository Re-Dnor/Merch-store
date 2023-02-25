import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const getLoaders = (isDev: boolean): webpack.RuleSetRule[] => {
  const FileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  const TSLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const CSSLoader = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
    exclude: /\.module\.css$/,
  };

  const SASSLoader = {
    test: /\.?s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resourcePath: string) => resourcePath.includes(".module."),
          },
        },
      },
      "sass-loader",
    ],
  };

  return [FileLoader, TSLoader, CSSLoader, SASSLoader];
};
