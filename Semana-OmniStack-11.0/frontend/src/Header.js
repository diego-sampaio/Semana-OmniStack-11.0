import React from 'react';

// Forma estruturada:
// Exporta o componente 'Header' pra ser importado em outro arquivo que for utilizar esse 'Header' (cabeçalho)
//export default function Header(props) { /* props: parâmetro recebido com as propriedades atribuídas no componente '<Header>'. No caso o 'title' de App.js */
//  return (
//    <header>
//      <h1>{props.title}</h1> {/* Como o nome da propriedade é 'title', basta colocar 'props.title' entre as {}, que serve para injetar o JS no HTML do componente */}
//      {/* Ou 'props.children' quando não é utilizado uma propriedade nomeada. Ex.: <Header>Título</Header> */}
//    </header>
//  );
//}

// Forma desestruturada: insere {} dentro do () de parâmetros:
export default function Header({ children }) { /* Assim é possível saber quais propriedades esse 'Header' recebe e utilizar somente as necessárias */
  return (
    <header>
      <h1>{children}</h1>
    </header>
  );
}