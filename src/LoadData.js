
import {letterDictionary} from "./LetterDictionary";

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
                    var lines = rawFile.responseText.split("\n");

                    for(var i = 0 ; i < 4; i++ ) {
                        var elements = lines[i].split( "," );
                        var listOfElements = [];

                        predicted.push(letterDictionary[elements[0]]);
                        for ( var j = 1 ; j < elements.length ; j++ ) {
                            listOfElements.push(parseInt(elements[j]));
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


