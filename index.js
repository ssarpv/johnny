// const ebook_pages =  []

//     const fs = require("fs");
//     const {mkdir,writeFile} = require("fs/promises");
//     const { Readable } = require('stream');
//     const { finished } = require('stream/promises');
//     const path = require("path");
//     const downloadFile = (async (url, folder=".") => {
//       const res = await fetch(url);
//       if (!fs.existsSync("downloads")) await mkdir("downloads"); //Optional if you already have downloads directory
//       const destination = path.resolve("./downloads", folder);
//       const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
//       await finished(Readable.fromWeb(res.body).pipe(fileStream));
//     });



    
// // Function to iterate through the array and introduce delay after every 100 executions
// async function processArrayWithDelay() {
//     const batchSize = 1;
//     for (let i = 0; i < ebook_pages.length; i++) {
//       const page = ebook_pages[i];
//       downloadFile(page.path, `${i}.jpg`);
  
//       // Introduce delay after every batchSize iterations
//       if ((i + 1) % batchSize === 0) {
//         await delay(1000); // Delay for 1 second (1000 milliseconds)
//       }
//     }
//   }
  
//   // Utility function to create a promise-based delay
//   function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
  
//   // Call the function to start processing the array with the specified delay
//   processArrayWithDelay();



const itp = require('image-to-pdf')
const fs = require('fs')
const path = require('path')

const pages = fs.readdirSync('./Downloads').map((page) => path.join(__dirname,'downloads',page))


// Custom sorting function to sort file paths in numerical order
function numericalSort(a, b) {
    const numA = parseInt(a.match(/\d+/)[0], 10); // Extract numeric part from file path
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
  }
  
  // Sort the file paths using the custom sorting function
  pages.sort(numericalSort);

// second arg is resolution, be sure to verify
itp(pages, [2634, 3543])
    .pipe(fs.createWriteStream('output.pdf'))