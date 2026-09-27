// Конфигурация Cloudinary — туда загружаются сами фото (через unsigned
// upload preset, без сервера). Firestore при этом хранит только связку
// "лицевой счёт -> ссылки на фото".
window.CLOUDINARY_CONFIG = {
  cloudName: 'sy8cfvrz',
  uploadPreset: 'eirc-map',
};
