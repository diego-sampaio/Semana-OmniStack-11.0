import React from 'react'; /* Importação do React */
import ReactDOM from 'react-dom'; /* Importação da árvore de elementos (integração com o navegador) */
import App from './App'; /* Importação do 'App.js' dentro de uma váriavel 'App' */

/**
 * Aqui ocorre a renderização (apresentação em tela) do componente '<App />'
 * Inserindo '<App />', que contém o '<h1>Semana OmniStack</h1>', dentro da '<div id="root"></div>'
 * E assim o resultado desse processo é apresentado no dispositivo
 */

ReactDOM.render(<App />, document.getElementById('root')); 