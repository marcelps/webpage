const {series, parallel, src, dest, watch} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');

watch('style/*.css', minifyCss);
watch('templates/**/*.ejs', ejsTemplate);

function ejsTemplate() {
    return src('templates/pages/*.ejs')
        .pipe(ejs({}, {}, {ext: '.html'}))
        .pipe(dest('public'));
}

function javascript() {
    return src(
        [
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map',
            'node_modules/jquery/dist/jquery.slim.min.js',
            'node_modules/owl.carousel/dist/owl.carousel.min.js'
        ]
    )
        .pipe(dest('public/js'));
}

function css() {
    return src(
        [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
            'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
            'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css'
        ]
    )
        .pipe(dest('public/css'));
}

function minifyCss() {
    return src('style/*.css')
        .pipe(cleanCSS())
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('public/css'));
}

exports.default = series(minifyCss, ejsTemplate, parallel(javascript, css));