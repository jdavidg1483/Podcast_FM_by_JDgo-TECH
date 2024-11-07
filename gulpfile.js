const { src, dest, watch, series } = require('gulp');
//css
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
 //Imagenes
 const imagemin = require('gulp-imagemin');

function css( done ) {
    //Identifical el archivo principal
    src('src/scss/app.scss')
    //Compilar sass
    .pipe( sass() )
   
    //Exportar o guardarlo en una ubicacion
    .pipe( dest('build/css'))
   
    done();
}

function cssbuild(done) {
  //identicar archivo principal
  src('build/css/app.css')
  //minificar css
  .pipe( rename({
    suffix: '.min'
  }))
  .pipe( purgecss({
    content: ['index.html']
  }))
  .pipe( dest('build/css'))
  done();
}

function dev() {
  watch('src/scss/**/*.scss', css)
 
}

function imagenes(done) {
//buscar archivos de imagen
src('src/img/**/*')
//minificar imagenes
  .pipe( imagemin({ optimizationLevel: 3 } ) )
  //exportar a la archivo de build
  .pipe( dest('build/img')) 
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series( imagenes, css, dev); 
exports.build = series( cssbuild );