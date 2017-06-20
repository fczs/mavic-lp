var gulp = require('gulp'),
    del = require('del'),
    zip = require('gulp-zip'),
    ftp = require('vinyl-ftp'),
    sftp = require('gulp-sftp'),
    todo = require('gulp-todo'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    addsrc = require('gulp-add-src'),
    replace = require('gulp-replace'),
    uglifycss = require('gulp-uglifycss'),
    config = require('./ftp-config.json'),
    livereload = require('gulp-livereload'),
    spritesmith = require('gulp.spritesmith'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({browsers: [">1%"]});

var path = {
    src: {
        lessMain:   'src/less/main.less',
        lessDest:   'src/css',
        compiled:   'src/css/main.css',
        js:         'src/js/*.js',
        jsDest:     'src/js',
        jsMain:     'src/js/main.js',
        jsTmp:      'src/js/main.tmp.js'
    },
    prod: {
        include:    'templates/universal/include',
        css:        'templates/universal/css',
        js:         'templates/universal/js'
    },
    watch: {
        less:       'src/less/*.less',
        js:         'src/js/*.js'
    }
};

//Bundles js plugins
gulp.task('concatPlugins', function() {
    return gulp.src([path.src.js, !path.src.jsMain])
        .pipe(concat(path.src.jsTmp))
        .pipe(gulp.dest(path.src.jsDest))
});

//Bundles and uglifies src js files to a production file
gulp.task('mainjs', ['concatPlugins'], function() {
    return gulp.src([path.src.jsMain])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(addsrc.prepend(path.src.jsTmp))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.prod.js))
});

//Bundles and uglifies src css files to a production file
gulp.task('css', function () {
    return gulp.src(['src/css/*.css', '!src/css/styles.css'])
        .pipe(addsrc.append('src/css/styles.css'))
        .pipe(concat('styles.min.css'))
        .pipe(uglifycss({
            "maxLineLen": 500,
            "uglyComments": true
        }))
        .pipe(gulp.dest(path.prod.css))
});

gulp.task('clean', ['mainjs', 'css'], function() {
    return del(path.src.jsTmp);
});

//Changes the src js links to production main.min.js in the footer
gulp.task('change-footer', function() {
    return gulp.src(['templates/universal/include/footer.php'])
        .pipe(replace(/(src_scripts)([^]+?)(?=add_footer_js)/, '$1 \naddfooterjs\(MAIN_JS, \"any\"\)\;\n'))
        .pipe(gulp.dest(path.prod.include));
});

//Changes the src css links to production styles.min.css in the header
gulp.task('change-header', function() {
    return gulp.src(['templates/universal/include/header.php'])
        .pipe(replace(/(src_css)([^]+?)(?=cms_header)/, '$1 \naddcss\(STYLES_CSS, \"any\"\)\;\n'))
        .pipe(gulp.dest(path.prod.include));
});

//Gets current directory name and archives project with its name
gulp.task('production', ['clean','change-header', 'change-footer'], function(){
    //increase index by 1 to escape last backslash
    var projectName = __dirname.substring(__dirname.lastIndexOf('\\') + 1);
    gulp.src([
        './**',
        '!node_modules',
        '!src',
        '!node_modules/**',
        '!src/**',
        '.htaccess',
        '!gulpfile.js',
        '!README.md',
        '!TODO.md'])
        .pipe(zip(projectName + '.zip'))
        .pipe(gulp.dest(''))
});

//Generates a file with the list of to-do's
gulp.task('todo', function() {
    gulp.src([
        'templates/**/*.php',
        'components/**/*.php',
        'src/**/*.*',
        '*.php'])
        .pipe(todo({
            verbose: true
        }))
        .pipe(gulp.dest('./'));
});

//Compiles less into css
gulp.task('less', function() {
    gulp.src(path.src.lessMain)
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(path.src.lessDest))
        .pipe(sftp({
            host:       config.host,
            user:       config.user,
            pass:       config.password,
            port:       config.port,
            remotePath: config.remotePath
        }));
});

//Uploads files to the host
gulp.task('deploy', ['less'], function () {
    if (config.type == 'ftp') {
        // FTP version
        const conn = ftp.create( {
            host:     config.host,
            user:     config.user,
            password: config.password,
            port:     config.port,
            parallel: 10,
            reload:   true,
            debug:    function(d) {
                console.log(d);
            },
            log:      gutil.log
        });
        return gulp.src(path.src.compiled, {base: '.', buffer: false})
            .pipe(conn.newer(path.src.lessDest))
            .pipe(conn.dest(path.src.lessDest));
    } else {
        //SFTP version
        const conn = sftp({
            host:       config.host,
            user:       config.user,
            pass:       config.password,
            port:       config.port,
            remotePath: config.remotePath
        });
        return gulp.src(path.src.compiled, {base: '.', buffer: false})
            .pipe(conn);
    }
});

//Reloads a browser
gulp.task('reload', ['less'], function() {
    livereload()
});

//Production
gulp.task('prod', ['clean', 'todo']);

//Generates sprite icons.png and icons.css
gulp.task('sprite', function () {
    var spriteData = gulp.src('src/images/sprite/*.png').pipe(spritesmith({
        imgName: 'icons.png',
        imgPath: '../images/icons.png',
        cssName: 'icons.css'
    }));

    var imgStream = spriteData.img
        .pipe(gulp.dest('src/images'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('src/css'));

    return merge(imgStream, cssStream);
});

//Less changes watcher
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([path.watch.less], ['reload']);
});

//Default task
gulp.task('default', ['watch']);