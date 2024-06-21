import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyForm from './MyForm';

const MyComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://cdn.jwplayer.com/v2/playlists/Sg3n3cge');
            setData(result.data);
        };

        fetchData();
    }, []);
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div>
            <MyForm />
            <h1 className='mb-4'>Thịnh hành</h1>
            <div className='grid grid-cols-3 gap-8'>
                {data && data.playlist && data.playlist.map((item, index) => (
                    <div key={index}>
                        <h2>{item.title}</h2>
                        <img src={item.image} alt={item.title} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyComponent;