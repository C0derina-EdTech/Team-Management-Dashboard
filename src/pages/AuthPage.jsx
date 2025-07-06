import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Input from '../components/common/Input';

const AuthPage = ({ auth, db }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAuthAction = async () => {
        setError('');
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email: userCredential.user.email,
                    admin: false,
                    createdAt: new Date(),
                });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleAuthAction} className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    {isLogin ? 'Login' : 'Create Account'}
                </button>
                <p className="text-center text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:underline ml-1">
                        {isLogin ? 'Sign up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
