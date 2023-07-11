import fileinclude from 'gulp-file-include';
import webphtml from 'gulp-webp-html-nosvg';
import version from 'gulp-version-number';

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        })
      )
    ) // повідомлення про помилки
    .pipe(fileinclude()) // збираємо html файл з частин
    .pipe(app.plugins.replace(/@img\//g, 'img/')) // зміна шляхів
    .pipe(app.plugins.if(app.isBuild, webphtml()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        version({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
