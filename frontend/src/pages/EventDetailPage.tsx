import { Link, useNavigate, useParams } from "react-router-dom";
import Page from "../components/layout/Page";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../context/EventContext";
import { findEventById } from "../utils/filter-events";

function EventDetailPage() {
  const { id } = useParams();
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();
  const event = id ? findEventById(events, id) : undefined;

  function handleDelete(eventId: string) {
    if (window.confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
      deleteEvent(eventId);
      navigate("/etkinlikler");
    }
  }

  if (!event) {
    return (
      <Page title="Etkinlik bulunamadı">
        <div className="hata-kutusu" role="alert">
          <p>Bu etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
        </div>
        <Link className="buton" to="/etkinlikler">
          ← Listeye dön
        </Link>
      </Page>
    );
  }

  return (
    <Page title={event.title}>
      <EventDetail event={event} onDelete={handleDelete} />
    </Page>
  );
}

export default EventDetailPage;
