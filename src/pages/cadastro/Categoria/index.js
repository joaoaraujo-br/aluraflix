import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button'

function CadastroCategoria() {

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '#000',
    }
    const [categorias, setCategorias] = useState([])
    const [values, setValues] = useState(valoresIniciais)

    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor
        })
    }

    function handleChange(infosDoEvento) {
        const { getAttribute, value } = infosDoEvento.target
        setValue(
            infosDoEvento.target.getAttribute('name'),
            infosDoEvento.target.value)
    }

    useEffect(() => {
        const URL = 'http://localhost:8080/categorias'
        fetch(URL)
            .then(async (respostaDoServidor) => {
                const resposta = await respostaDoServidor.json()
                setCategorias([
                    ...resposta
                ])
            })
    }, [])

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault()
                setCategorias([
                    ...categorias,
                    values
                ])
                setValues(valoresIniciais)
            }}>

                <FormField 
                    label="Nome da Categoria"
                    value={values.nome}
                    onChange={handleChange}
                    type="text"
                    name="nome"
                />

                <FormField 
                    label="Descrição"
                    value={values.descricao}
                    onChange={handleChange}
                    type="textarea"
                    name="descricao"
                />

                <FormField 
                    label="Cor"
                    value={values.cor}
                    onChange={handleChange}
                    type="color"
                    name="cor"
                />

                <Button>
                    Cadastrar
                </Button>

            </form>

            {categorias.length === 0 && (
                <div>
                    Loading...
                </div>
            )}

            <ul>
                {categorias.map((categoria) => {
                    return (
                        <li key={`${categoria.nome}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>

            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria