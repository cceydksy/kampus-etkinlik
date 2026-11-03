import Page from "../components/layout/Page";
import { useEvents } from "../context/EventContext";

function AboutPage() {
  const { events } = useEvents();

  return (
    <Page title="Hakkında">
      <section>
        <h2>Kampüs Etkinlikleri nedir?</h2>
        <p>
          Fakültede düzenlenen seminer, atölye, söyleşi ve yarışmaları tek yerden takip etmeyi sağlayan bir web
          uygulaması. Etkinlikleri listeleyebilir, arayabilir, yeni etkinlik ekleyebilir, güncelleyebilir ve
          silebilirsin.
        </p>
        <p className="sonuc">Şu an sistemde {events.length} etkinlik var.</p>
        <p>Web Teknolojileri ve Programlama dersi dönem projesi · Ceyda Nur Aksoy</p>
      </section>
    </Page>
  );
}

export default AboutPage;
