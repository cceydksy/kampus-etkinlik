import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/validation";

type Errors = Partial<Record<"name" | "email" | "password" | "password2", string>>;

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: Errors = {};
    if (name.trim().length < 2) found.name = "Ad soyad en az 2 karakter olmalı.";
    if (!isValidEmail(email)) found.email = "Geçerli bir e-posta adresi girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    login({ name: name.trim(), email });
    navigate("/");
  }

  return (
    <Page title="Kayıt Ol">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="name">Ad Soyad</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined} />
          {errors.name && <span className="hata-metni">{errors.name}</span>}
        </div>
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
        <div className="alan">
          <label htmlFor="password2">Şifre (tekrar)</label>
          <input type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}
            aria-invalid={errors.password2 ? true : undefined} />
          {errors.password2 && <span className="hata-metni">{errors.password2}</span>}
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
      <p className="baglantilar">
        <Link to="/giris">Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </Page>
  );
}

export default RegisterPage;
