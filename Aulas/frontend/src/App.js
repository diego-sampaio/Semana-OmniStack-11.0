import React from 'react';

// import Header from './Header'; /* Importa o componente 'Header' do 'Header.js' */

import './global.css'

import Routes from './routes';

/** 
 * O React monta a estrutura da página (HTML, CSS) a partir do JavaScript.
 * E o JavaScript só executa depois que o index.html já está montado em tela.
 * O index.html é enviado para a tela, depois o JavaScript entra em ação e preenche o '<div id="root"></div>' com restante do código, que fica no index.js.
 * O index.js é o primeiro arquivo JavaScript que o index.html vai ler. Isso é feito de forma automática. É o padrão do React.
 */

/**
 * Quando o HTML é escrito dentro (integrado) de um arquivo JavaScript é chamado de JSX (JavaScript XML)
 * XML é a sintaxe do HTML
 */

/**
 * Propriedade no React:
 * Funciona como atributos no HTML. Ex.: <h1 id=title></h1>
 * 'id' é um atributo de 'h1'
 * O React tem a mesma sintaxe, onde os atributos (propriedades) são passados para componentes
 */

/**
 * Um componente no React é criado sempre que o código se repete várias vezes ou quando é um código isolado, que não depende de outro
 * Componentes deve ter sempre a primeira letra maiúscula. Ex.: 'Header'
 */

// Um componente no React é uma função que retorna HTML. Podendo ter funcionalidades JavaScript, CSS, etc. Como a função (componente) 'App' abaixo */
//function App() {
//  return (
//    /* <h1>Semana OmniStack</h1> */
//    /**
//     * Caso o título seja customizável por página, utilizamos o conceito de propriedade do React para exemplificar 
//     * Utilizamos a propriedade 'title' com o texto que deverá ser exibido no '<h1>' do 'header' do 'Header.js'
//     * Então, devemos recuperar esse 'title' no 'Header.js' que vai como um parâmetro (props (propriedades)) na função 'Header()'
//     */
//    <Header title="Semana OmniStack"/> 
//  );
//}

/**
 * Estado no React:
 * É uma informação que será mantida pelo componente.
 * Sempre que o componente precisar armazenar alguma informação, que pode vir, por exemplo, via input de usuário, via API, etc, e então manipulá-la é preciso criar um Estado.
 * Sempre que o Estado é alterado (manipulado), o componente vai renderizar novamente para exibir as informações em tela.
 */

/**
 * Imutabilidade:
 * Por uma questão de performance, no React não pode manipular a variável do Estado (valor de Estado) de forma direta.
 * É preciso sobrepor o valor da váriavel do Estado. Por isso o uso do useState() e setCounter() no exemplo abaixo.
 */

//function App() {
//  let [counter, setCounter] = useState(0); /* useState() retorna um Array de 2 posições: [valor da variável (counter), função de atualização (setCounter)] */
//
//  function increment() {
//    setCounter(counter + 1);
//  }
//
//  return (
//    <div>
//      <Header>Contador: {counter}</Header>
//      <button onClick={increment}>Incrementar</button>
//    </div>
//  );
//}

function App() {
  return (
    <Routes />
  );
}

export default App;