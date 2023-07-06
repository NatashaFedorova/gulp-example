// отримуємо ім'я папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist'; //ім'ям папки може бути назва проєкту. Папка ств-я автоматично
const srcFolder = './src';

// в цьому об'єкті зберігається вся інформація стосовно шляхів до файлів або папок
export const path = {
  build: {
    js: `${buildFolder}/js/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    files: `${buildFolder}/files/`, //шлях по якому переносяться папки з результатом
  },

  src: {
    js: `${srcFolder}/js/app.js`,
    html: `${srcFolder}/*.html`, // в папці src
    scss: `${srcFolder}/scss/style.scss`,
    files: `${srcFolder}/files/**/*.*`, //запис означає, що нас цікавлять всі папки та файли, з будь-яким розширенням, в папці files (що в папці src)
  }, // об'єкт шляхів вихідних файлів

  watch: {
    js: `${srcFolder}/js/**/*.js`,
    html: `${srcFolder}/**/*.html`, // в папці src та в папках вкладених в папці src
    scss: `${srcFolder}/scss/style.scss`,
    files: `${srcFolder}/files/**/*.*`, //запис означає, що нас цікавлять всі папки та файли, з будь-яким розширенням, в папці files (що в папці src)
  }, // шляхи до файлів (папок), за якими має слідкувати gulp та при змінах виконувати певні дії
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``, //вказуємо папку на віддаленому ftp-сервері
};
