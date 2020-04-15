import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ong_id = localStorage.getItem('ongId');

   async function handleCreateIncident(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            value,
        }
        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization:ong_id,
                },
            });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao criar caso, tente novamente.')
        }
    }

  return (
    <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile" >
                    <FiArrowLeft color="#E02041" size={16}/>
                    Voltar para Home
                </Link>
            </section>

            <form onSubmit={handleCreateIncident}>
                <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={ e => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={ e => setDescription(e.target.value)}
                />
                <input 
                    placeholder="Valor em Reais"
                    value={value}
                    onChange={ e => setValue(e.target.value)}
                />

                <button className="button" type="submit">Cadastrar</button>

            </form>
        </div>
    </div>
  );
}
