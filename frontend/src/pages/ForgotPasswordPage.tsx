import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Page from "../components/layout/Page";
import { isValidEmail } from "../utils/validation";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <Page title="Şifremi Unuttum" text="E-posta adresini yaz, sıfırlama bağlantısı gönderelim.">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined} />
          {error && <span className="hata-metni">{error}</span>}
        </div>
        <button type="submit">Bağlantı Gönder</button>
      </form>
      {sent && (
        <div className="basari-kutusu">
          <p>{email} adresine şifre sıfırlama bağlantısı gönderildi.</p>
        </div>
      )}
      <p className="baglantilar">
        <Link to="/giris">← Girişe dön</Link>
      </p>
    </Page>
  );
}

export default ForgotPasswordPage;
