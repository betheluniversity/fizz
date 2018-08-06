var assemble = require('assemble')

assemble.partials('./src/templates/partials/*.hbs')
assemble.layouts(['./src/templates/layouts/*.hbs'])
assemble.data(['./src/templates/data/*.json'])

assemble.task('default', function () {
    assemble.partials('./src/templates/partials/*.hbs')
    assemble.layouts(['./src/templates/layouts/*.hbs'])
    assemble.data(['./src/templates/data/*.json'])
    assemble.src('./src/templates/pages/*.hbs')
    assemble()
})
