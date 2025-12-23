import React, { useState } from 'react';
const BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

export default function MentorLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE}/api/mentors/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('mentor_token', data.token);
      setMsg('Login success. Redirecting...');
      setTimeout(() => window.location.href = '/mentor/dashboard', 700);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Mentor Login</h2>
      <form onSubmit={submit}>
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" required /><br/>
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" required /><br/>
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
