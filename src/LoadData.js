export function DataLoad()
{
    var predicted = [];
    var values = [];

    const fs = require('fs')

    fs.readFile('letter-recognition.data', (err, data) => {
        if (err) throw err;

        var lines = data.toString().split("\n");

        lines.forEach( e => {
            var elements = e.split(",");

            elements.forEach(f => {

            })
        })
    });
}