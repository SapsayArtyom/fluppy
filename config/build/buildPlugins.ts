import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: paths.favicon,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'public/assets', to: './assets' }, // Копирование содержимого папки public в build
            ],
        }),
    ]
}