# Kampüs Etkinlikleri · Backend (Sprint 8)

Etkinlikleri JSON olarak veren Express REST API. Veri MongoDB'de (Mongoose); sunucu kapanıp açılınca kayıtlar duruyor.

Ceyda Nur Aksoy · 2221032047

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # MONGODB_URI'ye kendi bağlantı adresini yaz
npm run seed           # 6 örnek etkinliği veritabanına ekler
npm run dev
```

Sunucu `http://localhost:3000` adresinde çalışır.

## Ortam değişkeni

| Değişken | Açıklama | Örnek |
| --- | --- | --- |
| `PORT` | Sunucunun dinlediği port | `3000` |
| `MONGODB_URI` | MongoDB bağlantı adresi (veritabanı adı `kampus`) | `mongodb://127.0.0.1:27017/kampus` |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik (MongoDB `_id`) | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Postman

6 test isteği `requests/kampus-api.json` dosyasında (Postman Collection v2.1). Postman'de **Import** ile açılabilir. 2. istek listedeki ilk `_id`'yi `eventId` değişkenine kaydeder; 3. istek bu değişkeni kullanır.
