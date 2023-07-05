// основний модуль
import gulp from 'gulp';
// імпорт шляхів
import { path } from './gulp/config/path.js';
// імпорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';

// передаємо значення в глобальну змінну
global.app = {
  path: path,
  gulp: gulp,
};

// наглядач за зміною в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
}

// сценарій виконання завдань
// метод series  - виконує завдання послідовно, тому послідовність написання завдань важлива
const dev = gulp.series(reset, copy, watcher);

gulp.task('default', dev);
