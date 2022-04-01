import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import './styles.css';

import api from "../../services/api";

export default function DetailsBook() {
    const { idbook } = useParams();
    const [infoBook, setInfoBook] = useState("")
    const [comentario, setComentario] = useState("")
    const [comentarioBook, setComentarioBook] = useState([]);

    const loginData = localStorage.getItem('loginData');

    useEffect(() => {
        api.get(`search/books/${idbook}`).then(response =>
            setInfoBook(response.data)
        ).catch({ error: "error" });
    }, [idbook])

    useEffect(() => {
        api.get(`send/comentarios/${idbook}`).then(response =>
            setComentarioBook(response.data)
        ).catch({ error: "error" });
    }, [idbook])

    async function handleComent(event) {
        event.preventDefault();

        const data = {
            id_book: idbook,
            user: loginData,
            comentario,
        }

        try {
            await api.post(`/send/comentarios/`, data).then().catch({ error: "error" });
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="detail-container">
            <header>
                <h1>Books Google</h1>
                <span>{infoBook?.volumeInfo?.title}</span>
            </header>

            <section>
                {/* <button>voltar</button> */}

                <span>{`Deixe seu comentario ${loginData}`}</span>
            </section>
            <div className="content">
                <img src={infoBook?.volumeInfo?.imageLinks?.thumbnail} alt="" />

                <p>descrição:{infoBook?.volumeInfo?.description}</p>
            </div>


            <form onSubmit={handleComent}>
                <input type="text"
                    placeholder="Deixe aqui seu comentario!"
                    value={comentario}
                    onChange={e => setComentario(e.target.value)}
                />
                <button type="submit">Comentar</button>
            </form>

            <ul>
                {comentarioBook.map(comentario => (
                    <li key={comentario.id}>
                        <p>{comentario.created_at}</p>
                        <p>{comentario.user}</p>
                        <p>{comentario.comentario}</p>

                    </li>
                ))}

            </ul>

        </div>
    )
}