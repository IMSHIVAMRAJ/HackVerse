import React, { useState } from 'react';
const BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

export default function MentorRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '', expertise: '', fee: 50000, personalMeetingLink: '' });
  const [msg, setMsg] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        bio: form.bio,
        expertise: form.expertise.split(',').map(s => s.trim()).filter(Boolean),
        fee: Number(form.fee),
        personalMeetingLink: form.personalMeetingLink
      };
      const res = await fetch(`${BASE}/api/mentors/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Register failed');
      localStorage.setItem('mentor_token', data.token);
      setMsg('Registered. Redirecting...');
      setTimeout(() => { window.location.href = '/mentor/dashboard'; }, 800);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Mentor Register</h2>
      <form onSubmit={submit}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" required /><br/>
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" required /><br/>
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" required /><br/>
        <input name="fee" value={form.fee} onChange={onChange} placeholder="Fee (in paise)" /><br/>
        <input name="expertise" value={form.expertise} onChange={onChange} placeholder="Expertise (comma separated)" /><br/>
        <input name="personalMeetingLink" value={form.personalMeetingLink} onChange={onChange} placeholder="Personal meeting link (optional)" /><br/>
        <textarea name="bio" value={form.bio} onChange={onChange} placeholder="Short bio" /><br/>
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
