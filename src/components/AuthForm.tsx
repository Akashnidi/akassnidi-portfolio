'use client';

import React, { useState } from 'react';

interface AuthFormProps {
  onLogin: (username: string, password: string) => void;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-poppins font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition-all duration-200"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition-all duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default AuthForm;