import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) { /* 'e': evento de 'submit' do formulário */
    e.preventDefault(); /* E aqui vai prevenir o comportamento do formulário de recarregar a página toda vez que executa o 'submit' */

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try
    {
      const response = await api.post('ongs', data)
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/'); /* Faz com que retorne para a página de logon, através do 'history' */
    } 
    catch (error)
    {
      alert('Erro no cadastro! Tente novamente.')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadatro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o logon
          </Link>
        </section>

        <form onSubmit={handleRegister}> {/* Todo formulário quando é enviado (submit) recarrega a página. Para prevenir isso, esse evento (e) é passado para o 'handleRegister()' */}
          <input
            placeholder="Nome da ONG"
            value={name} /* 'name' é a variável do estado (setState) */
            onChange={e => setName(e.target.value)} /* 'onChange' para ouvir as mudanças nesse 'input', onde o 'e' é o evento de mudança e o 'e.target.value' é o valor do 'input', colocando ele dentro da variável 'name' que está sendo armazenada no estado 'setState()' */
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{width: 80}} /* Tag 'style' é do React e da acesso a todas propriedades do CSS. Todo componente tem. Pode receber um objeto do JS. A primeira {} indica um código JS e a segunda um objeto do JS */
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}