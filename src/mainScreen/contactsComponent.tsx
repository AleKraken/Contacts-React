import React, { useState, useEffect } from 'react';
import '../index.css';

function ContactsComponent() {
    interface Contact {
        numeroIdentificacion: number;
        nombreCompleto: string;
        numeroTelefono: string;
        correoElectronico: string;
        productos: [
            idProducto: number,
            nombreProducto: string,
            detalleProducto: string,
        ];
    }

    const [data, setData] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/contacts')
            .then((response) => {

                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='mainScreen'>
            <ul>
                {data.slice(0, data.length).map((item) => (
                    <div className='card' key={item.numeroIdentificacion}>
                        <div className='cardText'>{item.nombreCompleto}</div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ContactsComponent;
