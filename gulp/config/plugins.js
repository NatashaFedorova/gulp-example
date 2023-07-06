import replace from 'gulp-replace'; // пошук та заміна
import plumber from 'gulp-plumber'; // обробка помилок
import notify from 'gulp-notify'; // повідомлення-підсказки
import browserSync from 'browser-sync'; // локальний сервер

// експортуємо об'єкт
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
};
