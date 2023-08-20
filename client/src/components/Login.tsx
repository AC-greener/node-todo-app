import React, { useState } from 'react';
import './login.css'; // 导入样式文件
import {login} from '../api'
interface LoginProps {
  // 定义组件的 props 类型
}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    // 在这里执行登录逻辑，例如发送请求到后端验证用户名和密码
    console.log('Logging in with username:', username);
    console.log('Password:', password);
    const res = await login({
      username,
      password
    })
    console.log('res :>> ', res);
  };

  return (
    <React.Fragment>
      <div className="login-container">
        <h2>Login</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </React.Fragment>
  );
}

export default Login;
