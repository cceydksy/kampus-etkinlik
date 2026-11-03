import { useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventContext";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <Page title="Etkinlik Ekle">
      <EventForm
        submitLabel="Kaydet"
        onSubmit={(event) => {
          addEvent(event);
          navigate(`/etkinlikler/${event.id}`);
        }}
      />
    </Page>
  );
}

export default AddEventPage;
