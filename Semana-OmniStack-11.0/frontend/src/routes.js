import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    <BrowserRouter> {/* O 'BrowserRouter' precisa estar por volta de tudo */}
      <Switch> {/* O 'Switch' faz com que somente uma rota seja executada por vez */}
        <Route path="/" exact component={Logon} /> {/* O 'Route' é a rota em si. O 'path' é caminho. O 'exact' é para o React entender, basicamente, que essa é a rota principal. O 'component' é o componente que a rota vai acessar */}
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}