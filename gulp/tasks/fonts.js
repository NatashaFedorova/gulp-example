import fs from 'fs'; // допомагає працювати з файлами
import fonter from 'gulp-fonter'; // допомагає перетворити шрифти
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // шукаємо файли шрифтів .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // конвертуємо в .ttf
      .pipe(
        fonter({
          formats: ['ttf'],
        })
      )
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  ); // вигружаємо в вихідну папку;
};

export const ttfToWoff = () => {
  // шукаємо файли шрифтів .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // конвертіруємо в .woff
      .pipe(
        fonter({
          formats: ['woff'],
        })
      )
      // вигружаємо в папку з результатом;
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // шукаємо файл шрифтів .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // конвертіруємо в .woff2
      .pipe(ttf2woff2())
      // вигружаємо в папку з результатом;
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontsStyle = () => {
  // файл стилів підключення шрифтів
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // перевірка чи існує файл шрифтів
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // перевірка чи є файл стилів для підключення шрифтів
      if (!fs.existsSync(fontsFile)) {
        // якщо файла немає  - створюємо
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          // записуємо підключення шрифтів в файл стилів
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;

            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;

            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === 'extrabold' ||
              fontWeight.toLowerCase() === 'heavy'
            ) {
              fontWeight = 800;
            } else if (
              fontWeight.toLowerCase() === 'extrabold' ||
              fontWeight.toLowerCase() === 'black'
            ) {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }

            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          'Файл scss/fonts.scss вже існує. Для оновлення файла треба його видалити!'
        );
      }
    }
  });

  return app.gulp.src(app.path.srcFolder);
  function cb() {}
};
