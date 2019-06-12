## Documentation of:
#### Letters recognition with neural network and k-NN
##### [Authors Marcel Mikołajko, Wiktor Androsiuk, Aleksander Wojtecki]

### Project and data set description: 

We have decided to solve 'Letters recognition' problem using data from:
<br>
> https://archive.ics.uci.edu/ml/datasets/Letter+Recognition

Our test implementation involves 26 categories and 20,000 unique test patterns.
We separeted input data in proportions of 80-20%. 
<br>
* 80% of input data is used for whole training process. 
* 20% of input data is used for letter recognition.

Our implementation is used to recognize letters from A to letter Z using 1 to 1 coding.
Each letter has her own coding. 
<br> 

All attributes are array of 17 elements containing:
1. Expected value of letter.
2. The horizontal position, counting pixels from the left edge of the image, of the center of the smallest rectangular box that can be drawn with all "on" pixels inside the box. 
3. The vertical position, counting pixels from the bottom, of the above box.
4. The width, in pixels, of the box.
5. The height, in pixels, of the box. 
6. The total number of "on" pixels in the character image. 
7. The mean horizontal position of all "on" pixels relative to the center of the box and divided by the width of the box. This feature has a negative value if the image is "left- heavy" as would be the case for the letter L. 
8. The mean vertical position of all "on" pixels relative to the center of the box and divided by the height of the box. 
9. The mean squared value of the horizontal pixel distances as measured in 6 above. This attribute will have a higher value for images whose pixels are more widely separated in the horizontal direction as would be the case for the letters W or M. 
10. The mean squared value of the vertical pixel distances as measured in 7 above. 
11. The mean product of the horizontal and vertical distances for each "on" pixel as meas- ured in 6 and 7 above. This attribute has a positive value for diagonal lines that run from bottom left to top right and a negative value for diagonal lines from top left to bottom right. 
12. The mean value of the squared horizontal distance times the vertical distance for each "on" pixel. This measures the correlation of the horizontal variance with the vertical position. 
13. The mean value of the squared vertical distance times the horizontal distance for each "on" pixel. This measures the correlation of the vertical variance with the horizontal position. 
14. The mean number of edges (an "on" pixel immediately to the right of either an "off" pixel or the image boundary) encountered when making systematic scans from left to right at all vertical positions within the box. This measure distinguishes between letters like "W" or "M" and letters like 'T' or "L." 
15. The sum of the vertical positions of edges encountered as measured in 13 above. This feature will give a higher value if there are more edges at the top of the box, as in the letter "Y."
16. The mean number of edges (an "on" pixel immediately above either an "off" pixel or the image boundary) encountered when making systematic scans of the image from bottom to top over all horizontal positions within the box. 
17. The sum of horizontal positions of edges encountered as measured in 15 above.
 
### Metoda rozwiązywania, narzędzie programistyczne. 
We have decided to use <B> React.js </B> application using <B> TenserFlow.JS </B>.

Most of code was prepared using <b> WebStrorm <B>.
 
###	Preparing data to experiment
At the begining of the training process application uses method <B> LoadData </B> from class <B> LoadData.js </B>.

  #### LoadData
This method includes loading data from <i> letter-recognition.data </i> file and parsing the whole lines to four separate lists:
1. List of training expected values in <i> 1 to 1 </i> coding- 1st elemement from line.
2. List of training parameters - other elements.
3. List of testing expected values in <i> 1 to 1 </i> coding - 1st elemement from line.
4. List of testing parameters - other elements.

Letters from the first element of array are converted into <i> 1 to 1 </i> coding using prepared map containing all letters with coding.
To convert it, simply take coding from map using letter from loaded data ad put it into both of expected lists.

  #### LetterDictionary
This clas is basicly map containing list of letters and 1 to 1 coding. for example:
>	"A" -> [0, 0, 0, 0, 0] <br>
> "B" -> [0, 0, 0, 0, 1] <br>
>	"C" -> [0, 0, 0, 1, 0] <br>

This clas is used in converting Letter from input array into it coding.

  #### Normalization
We are normalizing input data to number in range between 0 and 1.



###	Metoda oceniania jakości modelu. 
.
.
.
###	Wyniki eksperymentalne + wykresy w razie potrzeby.
.
.
.

###	Własne komentarze, wnioski. 

  #### Draw and recognize
At the begining of this project we thougt that we will create aplication with drawing module.
This module would be used for recognition letter prepared by user but we was unable to implement it because of lack of time.
<br>
In future we are planning to go back to this project and finish this module.

 <hr>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
