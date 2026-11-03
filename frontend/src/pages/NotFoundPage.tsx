import { Link } from "react-router-dom";
import Page from "../components/layout/Page";

function NotFoundPage() {
  return (
    <Page title="Sayfa bulunamadı">
      <div className="hata-kutusu" role="alert">
        <p>Aradığın sayfa bulunamadı (404).</p>
      </div>
      <Link className="buton" to="/">
        Ana sayfaya dön
      </Link>
    </Page>
  );
}

export default NotFoundPage;
