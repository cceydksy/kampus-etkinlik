import { useState } from "react";
import type { FormEvent } from "react";
import type { CampusEvent, Category } from "../../types/campus-event";

interface EventFormProps {
  initialEvent?: CampusEvent;
  submitLabel: string;
  onSubmit: (event: CampusEvent) => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

type Errors = Partial<Record<"title" | "category" | "date" | "time" | "location" | "capacity", string>>;

function EventForm({ initialEvent, submitLabel, onSubmit }: EventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title ?? "");
  const [category, setCategory] = useState<Category | "">(initialEvent?.category ?? "");
  const [date, setDate] = useState(initialEvent?.date ?? "");
  const [time, setTime] = useState(initialEvent?.time ?? "");
  const [location, setLocation] = useState(initialEvent?.location ?? "");
  const [capacity, setCapacity] = useState(initialEvent ? String(initialEvent.capacity) : "");
  const [description, setDescription] = useState(initialEvent?.description ?? "");
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const e: Errors = {};
    if (title.trim().length < 3) e.title = "Etkinlik adı en az 3 karakter olmalı.";
    if (!category) e.category = "Bir kategori seçin.";
    if (!date) e.date = "Tarih seçin.";
    if (!time) e.time = "Saat seçin.";
    if (!location.trim()) e.location = "Yer bilgisini yazın.";
    const c = Number(capacity);
    if (!capacity || !Number.isInteger(c) || c < 1 || c > 1000) e.capacity = "Kontenjan 1 ile 1000 arasında olmalı.";
    return e;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0 || category === "") return;

    onSubmit({
      id: initialEvent?.id ?? `event-${Date.now()}`,
      title: title.trim(),
      category,
      date,
      time,
      location: location.trim(),
      capacity: Number(capacity),
      description: description.trim(),
      image: initialEvent?.image,
    });
  }

  return (
    <>
      <p className="form-notu">Yıldızlı (*) alanlar zorunludur.</p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="title">Etkinlik Adı *</label>
          <input id="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" value={title}
            onChange={(e) => setTitle(e.target.value)} aria-invalid={errors.title ? true : undefined} />
          {errors.title && <span className="hata-metni">{errors.title}</span>}
        </div>
        <div className="alan">
          <label htmlFor="category">Kategori *</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category | "")}
            aria-invalid={errors.category ? true : undefined}>
            <option value="">Seçiniz</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <span className="hata-metni">{errors.category}</span>}
        </div>
        <div className="alan">
          <label htmlFor="date">Tarih *</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}
            aria-invalid={errors.date ? true : undefined} />
          {errors.date && <span className="hata-metni">{errors.date}</span>}
        </div>
        <div className="alan">
          <label htmlFor="time">Saat *</label>
          <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)}
            aria-invalid={errors.time ? true : undefined} />
          {errors.time && <span className="hata-metni">{errors.time}</span>}
        </div>
        <div className="alan">
          <label htmlFor="location">Yer *</label>
          <input id="location" placeholder="Örn. A Blok Konferans Salonu" value={location}
            onChange={(e) => setLocation(e.target.value)} aria-invalid={errors.location ? true : undefined} />
          {errors.location && <span className="hata-metni">{errors.location}</span>}
        </div>
        <div className="alan">
          <label htmlFor="capacity">Kontenjan *</label>
          <input type="number" id="capacity" min={1} max={1000} value={capacity}
            onChange={(e) => setCapacity(e.target.value)} aria-invalid={errors.capacity ? true : undefined} />
          {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
        </div>
        <div className="alan">
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">{submitLabel}</button>
      </form>
    </>
  );
}

export default EventForm;
