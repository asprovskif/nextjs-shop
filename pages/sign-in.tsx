import React, {useState} from 'react';
import Page from '../components/Page';
import Input from '../components/Input';
import Field from '../components/Field';
import Button from '../components/Button';

const SignIn: React.FC<any> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('should submit', {email, password})
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