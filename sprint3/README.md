https://kampus-etkinlik-sigma.vercel.app

# Kampüs Etkinlikleri · Sprint 3

JavaScript ve DOM. Etkinlikler artık `js/data.js` içindeki diziden üretiliyor.

**Etiket:** `sprint-03`

## Bu sprintte yapılanlar

- `js/data.js`: 6 etkinlik tek bir dizide (id, title, category, date, time, location, capacity, description).
- `js/event-list.js`: Kartlar veriden üretiliyor. Ana sayfa `data-limit="2"` ile tarihi en yakın 2 etkinliği, Etkinlikler sayfası hepsini gösteriyor. Arama ve kategori filtresi birlikte çalışıyor.
- `js/event-detail.js`: Detay sayfası `?id=` ile doğru etkinliği açıyor; geçersiz veya eksik id'de hata kutusu çıkıyor.
- `js/event-form.js`: Form kendi doğrulamasını yapıyor; hatalı alanlar kırmızı ve altında mesaj, başarıda yeşil kutuda JSON nesne. Güncelleme sayfası id ile dolu geliyor.
- Menüde Ana Sayfa, Etkinlikler, Ekle var; Güncelle'ye detay sayfasından gidiliyor.
- localStorage, framework ve jQuery kullanılmadı.
