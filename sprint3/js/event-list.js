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


const list = document.querySelector("#etkinlik-listesi");

// Bir etkinlikten Sprint 2'deki sınıflarla bir kart üretir
function createCard(event) {
  return `<article class="kart">
    <h2>${event.title}</h2>
    <p class="kategori">${event.category}</p>
    <p>Tarih: <time datetime="${toISO(event.date)}T${event.time}">${formatTarih(event.date, event.time)}</time></p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p class="aciklama">${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

// ---- Ana sayfa: data-limit varsa sadece en yakın N etkinlik ----
if (list.dataset.limit) {
  const yaklasan = [...events] // sort asıl diziyi bozmasın diye kopya
    .sort((a, b) => toISO(a.date).localeCompare(toISO(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// ---- Liste sayfası: arama + kategori filtresi ----
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategorileri veriden üret, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.textContent = kategori;
    kategoriSecimi.append(option);
  });

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent =
      sonuc.length === 0
        ? "Aramanıza uygun etkinlik bulunamadı."
        : `${sonuc.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => e.preventDefault()); // Enter sayfayı yenilemesin

  filtrele(); // açılışta "6 etkinlik listeleniyor."
}
