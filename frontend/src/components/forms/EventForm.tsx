import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="form-notu">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="alan">
          <label htmlFor="title">Etkinlik Adı</label>
          <input id="title" name="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
        </div>
        <div className="alan">
          <label htmlFor="category">Kategori</label>
          <select id="category" name="category" defaultValue="">
            <option value="">Seçiniz</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="alan">
          <label htmlFor="date">Tarih</label>
          <input type="date" id="date" name="date" />
        </div>
        <div className="alan">
          <label htmlFor="time">Saat</label>
          <input type="time" id="time" name="time" />
        </div>
        <div className="alan">
          <label htmlFor="location">Yer</label>
          <input id="location" name="location" placeholder="Örn. A Blok Konferans Salonu" />
        </div>
        <div className="alan">
          <label htmlFor="capacity">Kontenjan</label>
          <input type="number" id="capacity" name="capacity" min={1} max={1000} />
        </div>
        <div className="alan">
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" name="description" rows={5} />
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;
