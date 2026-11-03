https://ceydanuraksoy-frontend.vercel.app

# Kampüs Etkinlikleri · Vize Projesi

Fakültedeki etkinlikleri listeleyen, arayan, ekleyen, güncelleyen ve silen React + TypeScript uygulaması.
Ceyda Nur Aksoy · 2221032047 · Web Teknolojileri ve Programlama

## Kullanılan teknolojiler

Vite, React, TypeScript (strict), React Router, Context API. Veri şimdilik `src/data/events.ts` içindeki örnek kayıtlardan geliyor; backend sonraki sprintlerde eklenecek.

## Sayfalar (10 route)

| Adres | Sayfa |
| --- | --- |
| `/` | Ana sayfa (yaklaşan 2 etkinlik) |
| `/etkinlikler` | Tüm etkinlikler, arama ve kategori filtresi |
| `/etkinlikler/:id` | Etkinlik detayı, silme (onaylı) |
| `/etkinlik-ekle` | Etkinlik ekleme formu |
| `/etkinlikler/:id/duzenle` | Etkinlik güncelleme formu |
| `/giris` | Giriş formu |
| `/kayit` | Kayıt formu |
| `/sifremi-unuttum` | Şifremi unuttum formu |
| `/hakkinda` | Hakkında |
| `*` | 404 sayfası |

## Klasör yapısı

- `src/context/`: `EventContext` (etkinlik ekle, güncelle, sil) ve `AuthContext` (giriş yapan kullanıcı)
- `src/pages/`: 10 sayfa bileşeni
- `src/components/layout/`: Page, Header, Navigation, Footer
- `src/components/events/`: EventCard, EventList, EventFilter, EventDetail
- `src/components/forms/`: EventForm (doğrulamalı)
- `src/types/`, `src/data/`, `src/utils/`: Tipler, örnek veri, yardımcı fonksiyonlar

## Çalıştırma

```bash
npm install
npm run dev
npm run build
```
