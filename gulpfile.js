// основний модуль
import gulp from 'gulp';

// імпорт шляхів
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

// імпорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';

// передаємо значення в глобальну змінну
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// наглядач за зміною в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
}

// паралельний сценарій
const mainTasks = gulp.parallel(copy, html, scss, js);

// сценарій виконання завдань
// метод series  - виконує завдання послідовно, тому послідовність написання завдань важлива
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev);
