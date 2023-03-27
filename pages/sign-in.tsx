import React from 'react';
import Page from '../components/Page';
import Input from '../components/Input';
import Field from '../components/Field';
import Button from '../components/Button';

const SignIn: React.FC<any> = () => {
    return (
        <Page title="Sign in">
            <form>
                <Field label="Email">
                    <Input type="email"/>
                </Field>
                <Field label="Password">
                    <Input type="password"/>
                </Field>
                <Button type="submit">
                    Sign in
                </Button>
            </form>
        </Page>
    );
}

export default SignIn;