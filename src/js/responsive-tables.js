// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]) // passes back stuff we need
    }
}

var tableList = document.querySelectorAll('table.responsive')
forEach(tableList, function (index, value) {
    // console.log(index, value); // passes index + value back!

    var headertext = []
    var headers = value.querySelectorAll('th')
    // var tablerows = value.querySelectorAll('th')
    var tablebody = value.querySelector('tbody')

    for (var i = 0; i < headers.length; i++) {
        var current = headers[i]
        headertext.push(current.textContent.replace(/\r?\n|\r/, ''))
    }

    for (var k = 0, row; row = tablebody.rows[k]; k++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            col.setAttribute('data-th', headertext[j])
        }
    }
})
