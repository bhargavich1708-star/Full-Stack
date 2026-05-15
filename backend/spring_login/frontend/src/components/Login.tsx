import React, { useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({
    text: '',
    type: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: 'Working...', type: null });

    const endpoint = isLogin ? '/api/login' : '/api/signup';
    
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: data.message, type: 'success' });
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Oops! The server is sleeping. Try again later! 💤', type: 'error' });
    }
  };

  return (
    <div className="login-page">
      {/* Background drifting clouds */}
      <div className="cloud" style={{ top: '10%', animationDelay: '0s' }}>☁️</div>
      <div className="cloud" style={{ top: '40%', animationDelay: '-10s' }}>☁️</div>
      <div className="cloud" style={{ top: '70%', animationDelay: '-5s' }}>☁️</div>

      {/* Left Side: Mascot & Welcome */}
      <div className="side-panel left">
        <div className="mascot-large">🌈</div>
        <h1>{isLogin ? "Welcome Back!" : "Join the Club!"}</h1>
        <p>{isLogin ? "Ready for some fun?" : "It's going to be awesome!"}</p>
      </div>

      {/* Center: The Form Card */}
      <div className="center-panel">
        <div className="main-card">
          <h2>{isLogin ? "Hello! ✨" : "Sign Up 🎈"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Your Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="What should we call you?"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Where should we send mail?"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="password">Secret Code</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Shhh... it's a secret!"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-button">
              {isLogin ? "Let's Go! 🚀" : "Create Account! ✨"}
            </button>
          </form>

          <div className="toggle-link">
            {isLogin ? (
              <p>New here? <span onClick={() => { setIsLogin(false); setMessage({ text: '', type: null }); }}>Sign up now!</span></p>
            ) : (
              <p>Already a member? <span onClick={() => { setIsLogin(true); setMessage({ text: '', type: null }); }}>Log in here!</span></p>
            )}
          </div>

          {message.type && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Toy Playground */}
      <div className="side-panel right">
        <h3>Toy Box 🧸</h3>
        <p>Click the toys to play!</p>
        <div className="toy-box">
          <div className="toy" title="Spin me!">🧸</div>
          <div className="toy" title="Boop!">🦖</div>
          <div className="toy" title="Zoom!">🏎️</div>
          <div className="toy" title="Fly!">🛸</div>
          <div className="toy" title="Meow!">🐱</div>
          <div className="toy" title="Quack!">🦆</div>
        </div>
        <div className="mascot-large" style={{ fontSize: '5rem', marginTop: '20px' }}>🎈</div>
      </div>
    </div>
  );
};

export default Login;
