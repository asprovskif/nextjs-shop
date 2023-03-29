import React, {useState} from 'react';
import Page from '../components/Page';
import Input from '../components/Input';
import Field from '../components/Field';
import Button from '../components/Button';
import {fetchJson} from '../lib/api';
import {useRouter} from 'next/router';
import {useMutation, useQueryClient} from 'react-query';
import {User} from '../lib/user';
import {useSignIn} from '../hooks/user';

const SignIn: React.FC<any> = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signInLoading, signInError, signIn} = useSignIn();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const valid = await signIn(email, password);
        if (valid) await router.push('/');
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
                {signInError && (
                    <p className='text-red-700'>
                        Invalid credentials
                    </p>
                )}
                {signInLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Button type="submit">
                        Sign in
                    </Button>
                )}
            </form>
        </Page>
    );
}

export default SignIn;