// основний модуль
import gulp from 'gulp';

// імпорт шляхів
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

// імпорт задач
import { copy } from './gulp/tasks/copy.js';
import { img } from './gulp/tasks/img.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';

// передаємо значення в глобальну змінну
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// наглядач за зміною в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.img, img);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
}

// паралельний сценарій
const mainTasks = gulp.parallel(copy, img, html, scss);

// сценарій виконання завдань
// метод series  - виконує завдання послідовно, тому послідовність написання завдань важлива
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev);
