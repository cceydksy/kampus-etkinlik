import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const categories = [...new Set(events.map((e) => e.category))];

const formatDate = (date: string) =>
  new Date(`${date}T00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p className="kategori">{event.category}</p>
        <p>
          Tarih: <time dateTime={`${event.date}T${event.time}`}>{formatDate(event.date)}, {event.time}</time>
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p className="aciklama">{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <p className="site-adi">Kampüs Etkinlikleri</p>
        <nav>
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <h1>{title}</h1>

        {page === "home" && (
          <>
            <p className="giris">Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <section>
              <h2>Yaklaşan 2 Etkinlik</h2>
              <section className="kartlar">{upcoming.map(renderCard)}</section>
              <button type="button" onClick={() => go("events")}>
                Tüm etkinlikleri gör
              </button>
            </section>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="kartlar" aria-label="Etkinlik listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="hata-kutusu" role="alert">
              <p>Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            </div>
            <button type="button" onClick={() => go("events")}>
              ← Listeye dön
            </button>
          </>
        )}

        {page === "detail" && selected && (
          <article>
            <div className="detay">
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}

              <section className="kunye">
                <h2>Etkinlik Künyesi</h2>
                <dl>
                  <dt>Tarih</dt>
                  <dd>
                    <time dateTime={`${selected.date}T${selected.time}`}>
                      {formatDate(selected.date)}, {selected.time}
                    </time>
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </section>
            </div>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <p className="baglantilar">
              <button type="button" onClick={() => go("events")}>
                ← Listeye dön
              </button>
              <button type="button" onClick={() => go("update", selected.id)}>
                Bu etkinliği güncelle
              </button>
            </p>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="form-notu">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form onSubmit={(e) => e.preventDefault()}>
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
              <button type="submit">{page === "update" ? "Güncelle" : "Kaydet"}</button>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Ceyda Nur Aksoy · 2221032047 · 2026</p>
      </footer>
    </>
  );
}

export default App;
