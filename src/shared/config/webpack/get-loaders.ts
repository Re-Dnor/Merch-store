import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const getLoaders = (): webpack.RuleSetRule[] => {
  const TSLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const SASSLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resourcePath: string) =>
              /\.module\.s?css$/.test(resourcePath),
          },
        },
      },
      "sass-loader",
    ],
  };

  return [TSLoader, SASSLoader];
};
