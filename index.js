/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
let input = "";
console.log("Hello");
inquirer
    .prompt([
        {
            type: "input",
            name: "inputText",
            message: "Enter an input for QR image:",
        }
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        input = answers.inputText;
        var qr_svg = qr.image(input, { type: 'png' });
        qr_svg
            .pipe(fs.createWriteStream('qr_img.png'))
            .on('finish', function () {
                console.log('QR code saved as qr_img.png');
            });
        fs.writeFile("URL.txt", input, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });

    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.log("Some error with prompt rendering");
        } else {
            // Something else went wrong
            console.log("Some error ");
        }
    });


