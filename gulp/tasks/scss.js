// sourcemaps: true - дозволяє побачити,
// в якому саме файлі зі стилями помилка
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // стискає css файли
import webpcss from 'gulp-webpcss'; // виводить webp-зображення
import autoprefixer from 'gulp-autoprefixer'; // додавання вендорних префіксів (впливає на кросбраузерність верстки)
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групує медіа-запити

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SCSS',
          message: 'Error: <%= error.message %>',
        })
      )
    ) // повідомлення про помилки
    .pipe(app.plugins.replace(/@img\//g, '../img/')) // зміна шляхів
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(
      webpcss({
        webpClass: '.webp',
        noWebpClass: '.no-webp',
      })
    )
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ['last 3 versions'],
        cascade: true,
      })
    )
    .pipe(app.gulp.dest(app.path.build.css)) // перед стисканням зберігаємо також файл зі стилями (не стиснутий)
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
};
