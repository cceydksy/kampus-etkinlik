import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/validation";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!isValidEmail(email)) found.email = "Geçerli bir e-posta adresi girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    login({ name: email.split("@")[0], email });
    navigate("/");
  }

  return (
    <Page title="Giriş Yap">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined} />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>
        <div className="alan">
          <label htmlFor="password">Şifre</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined} />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
      <p className="baglantilar">
        <Link to="/sifremi-unuttum">Şifremi unuttum</Link>
        <Link to="/kayit">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </Page>
  );
}

export default LoginPage;
