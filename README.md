# Eternal Realm — Rune Resonance

Game action-RPG 2D berbasis HTML Canvas, CSS, dan JavaScript vanilla. Tidak memerlukan framework atau proses build.

## Mekanik yang sudah aktif
- Gerakan karakter real-time dengan WASD / tombol panah.
- Serangan melee (Space) dengan jangkauan area.
- Ember (Q) dan Frost (R) sebagai projectile magic; Frost memperlambat musuh.
- Rune Resonance: gunakan Ember dan Frost secara berurutan dalam 5 detik untuk mengisi meter dan memicu ledakan area.
- Dash (Shift) dengan cooldown dan potion (1) untuk memulihkan HP.
- AI musuh: Slime dan Brute mengejar lalu menyerang; Wisp menjaga jarak dan menembakkan projectile.
- Quest Elder Rowan, peti harta, shrine pemulih, XP, level-up, gold, shards, dan autosave di browser.
- Monster akan muncul kembali setelah beberapa saat agar area tetap bisa dimainkan.
- Kontrol layar sentuh untuk perangkat mobile.

## Kontrol
| Aksi | Keyboard |
|---|---|
| Bergerak | WASD / Arrow |
| Serangan melee | Space |
| Ember | Q |
| Frost | R |
| Dash | Shift |
| Potion | 1 |
| Interaksi | F |
| Pause | Esc |

## Menjalankan
Buka index.html di browser atau jalankan server lokal:
python -m http.server 8000

Kemudian buka http://localhost:8000.

## Catatan
Ini adalah prototype single-player. Chat, party, sinkronisasi pemain, akun, dan multiplayer online belum diimplementasikan.
