import React, {useState} from 'react';
import Page from '../components/Page';
import Input from '../components/Input';
import Field from '../components/Field';
import Button from '../components/Button';
import {fetchJson} from '../lib/api';

const SignIn: React.FC<any> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetchJson('http://localhost:1337/auth/local', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({identifier: email, password}),
        })

        console.log('response', response);
    }

    return (
        <Page title="Sign in">
            <form onSubmit={handleSubmit}>
                <Field label="Email">
                    <Input type="email" value={email} required
                    onChange={(event) => setEmail(event.target.value)}
                    />
                </Field>
                <Field label="Password">
                    <Input type="password" value={password} required
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </Field>
                <Button type="submit">
                    Sign in
                </Button>
            </form>
        </Page>
    );
}

export default SignIn;