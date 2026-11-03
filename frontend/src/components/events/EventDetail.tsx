import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onDelete: (id: string) => void;
}

function EventDetail({ event, onDelete }: EventDetailProps) {
  return (
    <article>
      <div className="detay">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}

        <section className="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd>
              <time dateTime={`${event.date}T${event.time}`}>
                {formatDate(event.date)}, {event.time}
              </time>
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </section>
      </div>

      <h2>Açıklama</h2>
      <p>{event.description || "Açıklama eklenmemiş."}</p>

      <p className="baglantilar">
        <Link className="buton" to="/etkinlikler">
          ← Listeye dön
        </Link>
        <Link className="buton" to={`/etkinlikler/${event.id}/duzenle`}>
          Bu etkinliği güncelle
        </Link>
        <button type="button" className="buton-sil" onClick={() => onDelete(event.id)}>
          Etkinliği sil
        </button>
      </p>
    </article>
  );
}

export default EventDetail;
