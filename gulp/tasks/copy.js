// отримали файли з app.path.src.files
// перенесли файли в app.path.bulid.files

export const copy = () => {
  return app.gulp
    .src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files));
};
