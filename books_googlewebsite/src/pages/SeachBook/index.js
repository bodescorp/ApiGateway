import React, { useState } from "react";
import { Link } from "react-router-dom";

import './styles.css';

import api from "../../services/api";

export default function SeachBook() {
    const [nameBook, setName] = useState("");
    const [livros, setLivros] = useState([]);
    const [count, setCount] = useState(0)

    const loginData = localStorage.getItem('loginData');


    async function increment() {
        setCount(count + 1);
        await api.post(`search/books?pages=${count}`, { nameBook }).then((response) =>
            setLivros(response.data.items)
        ).catch({ error: "error" });
    }

    async function decrement() {
        setCount(count - 1);
        await api.post(`search/books?pages=${count}`, { nameBook }).then((response) =>
            setLivros(response.data.items)
        ).catch({ error: "error" });
    }

    async function handleSeach(event) {
        event.preventDefault();
        setCount(0);

        try {
            await api.post(`search/books?pages=${count}`, { nameBook }).then((response) =>
                setLivros(response.data.items)
            ).catch({ error: "error" });
            console.log(livros)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="seach-container">
            <div className="content">
                <section>
                    <h1>Book Google</h1>
                    <p>Seja bem Vindo {loginData}</p>
                </section>

                <form onSubmit={handleSeach}>
                    <input
                        type="text"
                        placeholder="Procure aqui seu Livro!"
                        value={nameBook}
                        onChange={e => setName(e.target.value)}
                    />

                    <button className="button" type="submit">go</button>
                </form>

                <ul>
                    {livros.map(livro => (
                        <li key={livro.id}>
                            <img src={livro.volumeInfo?.imageLinks?.thumbnail} alt="" />
                            <div>
                                <Link to={`/info/${livro.id}`}>  <span>{livro.volumeInfo.title}</span></Link>
                                <span>{livro.volumeInfo.subtitle}</span>
                            </div>

                        </li>
                    ))}

                </ul>

                <div className="button-group">
                    <button onClick={decrement}>back</button>

                    {/* <span>page {count}</span> */}

                    <button onClick={increment}>next</button>
                </div>

            </div>

        </div>
    )
}