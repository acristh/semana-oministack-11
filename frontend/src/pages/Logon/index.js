import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function hadleLogon(e) {
    e.preventDefault();

    try{
      const response = await api.post('/sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');

    } catch(err){
      alert('Erro na authenticação!');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero"/>
        <form onSubmit={hadleLogon}>
          <h1>Faça o seu logon</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          
          <Link className="back-link" to="/register" >
            <FiLogIn color="#E02041" size={16}/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="A group of people hugged"/>
    </div>
  );
}
