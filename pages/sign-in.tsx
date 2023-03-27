import React from 'react';
import Page from '../components/Page';

const SignIn: React.FC<any> = () => {
    return (
        <Page title="Sign in">
            <div>
                <input type="text" placeholder="Enter your email here"/>
            </div>
        </Page>
    );
}

export default SignIn;