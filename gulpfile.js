const {series, parallel, src, dest, watch} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

watch('style/*.css', minifyCss);

function javascript() {
    return src(
        [
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'node_modules/jquery/dist/jquery.slim.js'
        ]
    )
        .pipe(dest('public/js'));
}

function css() {
    return src(
        [
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ]
    )
        .pipe(dest('public/css'));
}

function minifyCss() {
    return src('style/*.css')
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        //.pipe(dest('style'))
        .pipe(dest('public/css'));
}

exports.default = series(minifyCss, parallel(javascript, css));