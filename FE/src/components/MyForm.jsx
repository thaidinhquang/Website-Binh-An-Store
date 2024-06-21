import React, { useState } from 'react';

const MyForm = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = JSON.stringify({
            model: 'claude-3-opus-20240229',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: 'Hello, world'
                }
            ]
        });

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });

        xhr.open('POST', 'https://claude-2-1.p.rapidapi.com/messages');
        xhr.setRequestHeader('x-rapidapi-key', 'cabe99266emshcae9636189ff573p1105cajsnaace6233c53f');
        xhr.setRequestHeader('x-rapidapi-host', 'claude-2-1.p.rapidapi.com');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button type="submit">Send</button>
        </form>
    );
};

export default MyForm;