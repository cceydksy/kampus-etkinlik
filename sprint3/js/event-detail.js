import { events } from "./data.js";

// "12-10-2026" -> "2026-10-12" (sıralama ve tarih nesnesi için)
function toISO(tarih) {
  const [gun, ay, yil] = tarih.split("-");
  return `${yil}-${ay}-${gun}`;
}

// "12-10-2026", "14:00" -> "12 Ekim 2026, 14:00"
function formatTarih(tarih, saat) {
  const okunur = new Date(`${toISO(tarih)}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${okunur}, ${saat}`;
}


const container = document.querySelector("#detay");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı | Kampüs Etkinlikleri";
  container.innerHTML = `
    <h1>Etkinlik bulunamadı</h1>
    <div class="hata-kutusu" role="alert"><p></p></div>
    <p><a class="buton" href="etkinlikler.html">← Listeye dön</a></p>`;

  // Adresten gelen id'yi textContent ile yazıyoruz; innerHTML'e koymak güvensiz olurdu
  container.querySelector(".hata-kutusu p").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Hangi etkinliğin açılacağı belirtilmemiş. Listeden bir etkinlik seçin.";
} else {
  document.title = `${event.title} | Kampüs Etkinlikleri`;
  container.innerHTML = `
    <h1>${event.title}</h1>

    <div class="detay">
      <figure>
        <div class="afis" role="img" aria-label="${event.title} afişi">
          <p class="afis-baslik">${event.title}</p>
          <p class="afis-bilgi">${formatTarih(event.date, event.time)} · ${event.location}</p>
        </div>
        <figcaption>${event.title} afişi</figcaption>
      </figure>

      <section class="kunye">
        <h2>Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt>
          <dd><time datetime="${toISO(event.date)}T${event.time}">${formatTarih(event.date, event.time)}</time></dd>
          <dt>Yer</dt>
          <dd>${event.location}</dd>
          <dt>Kategori</dt>
          <dd>${event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>${event.capacity} kişi</dd>
        </dl>
      </section>
    </div>

    <h2>Açıklama</h2>
    <p>${event.description}</p>

    <p class="baglantilar">
      <a class="buton" href="etkinlikler.html">← Listeye dön</a>
      <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
    </p>`;
}
