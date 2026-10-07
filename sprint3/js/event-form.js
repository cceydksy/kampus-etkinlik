import { events } from "./data.js";

// "12-10-2026" <-> "2026-10-12" (tarih kutusu YYYY-AA-GG ister, data.js GG-AA-YYYY tutar)
function toISO(tarih) {
  const [gun, ay, yil] = tarih.split("-");
  return `${yil}-${ay}-${gun}`;
}
function fromISO(iso) {
  const [yil, ay, gun] = iso.split("-");
  return `${gun}-${ay}-${yil}`;
}

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleModu = form.dataset.mode === "guncelle";

// Kategori seçeneklerini veriden üret (değerler data.js ile birebir aynı olsun)
const kategoriler = [...new Set(events.map((e) => e.category))];
kategoriler.forEach((kategori) => {
  const option = document.createElement("option");
  option.value = kategori;
  option.textContent = kategori;
  form.elements.kategori.append(option);
});

// ---- Güncelleme sayfası: adresteki id ile formu doldur ----
let etkinlik = null;

if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (etkinlik) {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = toISO(etkinlik.date);
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity ?? "";
    form.elements.aciklama.value = etkinlik.description;
  } else {
    document.querySelector(".form-notu").remove();
    form.outerHTML = `
      <div class="hata-kutusu" role="alert">
        <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      </div>
      <p><a class="buton" href="etkinlikler.html">Etkinliklere git</a></p>`;
  }
}

// ---- Gönderim ----
function hataGoster(alanAdi, metin) {
  const alan = form.elements[alanAdi];
  const hataYeri = document.querySelector(`#${alanAdi}-hata`);
  if (metin) {
    alan.setAttribute("aria-invalid", "true");
    hataYeri.textContent = metin;
  } else {
    alan.removeAttribute("aria-invalid");
    hataYeri.textContent = "";
  }
}

function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir sayı olmalı.";
  }
  return errors;
}

if (document.body.contains(form)) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // sayfa yenilenmesin

    const fd = new FormData(form);
    const kontenjan = fd.get("kontenjan").trim();
    const tarih = fd.get("tarih");

    // Formdaki Türkçe name'ler -> data.js'teki İngilizce alan adları
    const data = {
      id: guncelleModu ? etkinlik.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: tarih ? fromISO(tarih) : "",
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      capacity: kontenjan === "" ? null : Number(kontenjan),
      description: fd.get("aciklama").trim(),
    };

    const errors = dogrula(data);

    // Önce bütün eski hataları temizle, sonra yenilerini yaz
    ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"].forEach((alan) =>
      hataGoster(alan, errors[alan])
    );

    mesaj.innerHTML = "";

    if (Object.keys(errors).length > 0) {
      mesaj.innerHTML = `<div class="hata-kutusu" role="alert"><p>Formda hatalı alanlar var. İşaretli alanları düzeltin.</p></div>`;
      return;
    }

    const baslik = guncelleModu
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
    mesaj.innerHTML = `<div class="basari-kutusu"><p>${baslik}</p><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
    console.log(data);
  });
}
