# Kampüs Etkinlikleri · Backend (Sprint 7)

Etkinlikleri JSON olarak veren Express REST API. Veri şimdilik bellekte (`src/data/events.js`); sunucu yeniden başlayınca POST ile eklenenler kaybolur.

Ceyda Nur Aksoy · 2221032047

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Sunucu `http://localhost:3000` adresinde çalışır.

## Ortam değişkeni

| Değişken | Açıklama | Örnek |
| --- | --- | --- |
| `PORT` | Sunucunun dinlediği port | `3000` |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Postman

6 test isteği `requests/kampus-api.json` dosyasında (Postman Collection v2.1). Postman'de **Import** ile açılabilir.
