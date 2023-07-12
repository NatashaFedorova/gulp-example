import ghPagesPlugin from 'gulp-gh-pages';

export const ghPagesTask = () => {
  return app.gulp.src(`${app.path.buildFolder}/**/*`).pipe(ghPagesPlugin());
};
