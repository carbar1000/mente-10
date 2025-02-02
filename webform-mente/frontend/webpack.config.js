const path = require('path');

module.exports = {
  entry: './webform-mente.js', // Arquivo de entrada
  output: {
    filename: 'bundle.js', // Nome do arquivo de saída
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
  },
  mode: 'production', // Modo de produção
  devtool: 'source-map', // Adicionando source maps para facilitar a depuração
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Para processar arquivos CSS
      },
      {
        test: /\.html$/,
        use: ['html-loader'], // Para processar arquivos HTML
      },
    ],
  },
};
