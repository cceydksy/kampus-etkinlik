import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <div className="hata-kutusu" role="alert">
        <p>Aradığınız sayfa ya da etkinlik bulunamadı.</p>
      </div>
      <Link className="buton" to="/">
        Ana sayfaya dön
      </Link>
    </>
  );
}

export default NotFoundPage;
