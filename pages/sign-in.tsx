import React, {useState} from 'react';
import Page from '../components/Page';
import Input from '../components/Input';
import Field from '../components/Field';
import Button from '../components/Button';
import {fetchJson} from '../lib/api';
import {useRouter} from 'next/router';
import {useMutation, useQueryClient} from 'react-query';

const SignIn: React.FC<any> = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const queryClient = useQueryClient();
    const mutation = useMutation(async () => fetchJson('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await mutation.mutateAsync();
            queryClient.setQueryData('user', user);
            console.log('signed in', user);
            await router.push('/');
        } catch (err) {
        // mutation.isError will be true
        }
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
                {mutation.isError && (
                    <p className='text-red-700'>
                        Invalid credentials
                    </p>
                )}
                {mutation.isLoading ? (
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