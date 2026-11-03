import { Link, useNavigate, useParams } from "react-router-dom";
import Page from "../components/layout/Page";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventContext";
import { findEventById } from "../utils/filter-events";

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = id ? findEventById(events, id) : undefined;

  if (!event) {
    return (
      <Page title="Etkinlik Güncelle">
        <div className="hata-kutusu" role="alert">
          <p>Güncellenecek etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
        </div>
        <Link className="buton" to="/etkinlikler">
          Etkinliklere git
        </Link>
      </Page>
    );
  }

  return (
    <Page title="Etkinlik Güncelle">
      <EventForm
        initialEvent={event}
        submitLabel="Güncelle"
        onSubmit={(updated) => {
          updateEvent(updated);
          navigate(`/etkinlikler/${updated.id}`);
        }}
      />
    </Page>
  );
}

export default EditEventPage;
