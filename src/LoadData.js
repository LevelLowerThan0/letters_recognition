
export function LoadData()
{
    var predicted = [];
    var values = [];

    let readTextFile = file => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var lines = rawFile.responseText;
                    var i;
                    for( i = 0 ; i < 16000; i++ ) {
                        var elements = lines[i].split( "," );
                        var listOfElements = [];

                        var j;
                        for ( j = 1 ; j < elements.length ; j++ ) {
                            listOfElements.push(parseInt( elements[j], 10 ));
                        }
                        values.push(listOfElements);
                    }
                }
            }
        };
        rawFile.send(null);
    };

    readTextFile("./letter-recognition.data");
}


