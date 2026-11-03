import { Link } from "react-router-dom";
import Page from "../components/layout/Page";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventContext";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <Page title="Kampüs Etkinlikleri" text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.">
      <section>
        <h2>Yaklaşan 2 Etkinlik</h2>
        <EventList events={upcoming} emptyText="Henüz etkinlik yok." />
        <Link className="buton" to="/etkinlikler">
          Tüm etkinlikleri gör
        </Link>
      </section>
    </Page>
  );
}

export default HomePage;
