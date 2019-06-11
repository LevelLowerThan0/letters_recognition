
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
                    var allText = rawFile.responseText;
                    console.log(allText);
                }
            }
        };
        rawFile.send(null);
    };

    readTextFile("./letter-recognition.data");
}
