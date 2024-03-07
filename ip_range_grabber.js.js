const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');

async function grabIPRangeWithDelay(url, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await axios.get(url);
                const ipRange = response.data.startAddress + " - " + response.data.endAddress;
                resolve(ipRange);
            } catch (error) {
                console.error('Error fetching data:', error);
                reject(null);
            }
        }, delay);
    });
}


function extractIPFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
        const ipList = data.match(ipPattern);
        return ipList;
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

async function mainWithDelay() {
    const inputFilePath = 'ip.txt';
    const outputFilePath = 'output_ip_range.txt';
    const ipList = extractIPFromFile(inputFilePath);
    if (ipList) {
        console.log(chalk.green.bold(`
 _       _ _             _                           _   
| |_ ___| |_|___ ___ ___| |_ ___ ___ ___ ___ ___ ___| |_ 
|   | -_| | |  _| . | . |  _| -_|  _|_ -| -_|_ -| .'|  _|
|_|_|___|_|_|___|___|  _|_| |___|_| |___|___|___|__,|_|  
                    |_|`));
        console.log(chalk.red.bold(`@helicoptersesat: IP Range Grabber Tools`));
        console.log(`===========================================================`);
        console.log(`Retrieving data for ${ipList.length} IP...`);
        let outputData = '';
        for (let i = 0; i < ipList.length; i++) {
            const ip = ipList[i];
            const url = `https://rdap.arin.net/registry/ip/${ip}`;
            process.stdout.write(chalk.green.bold(`process IP ${i + 1}/${ipList.length} (${ip}) ->   `));
            const ipRange = await grabIPRangeWithDelay(url, 200);
            if (ipRange) {
                console.log(chalk.green.bold('Success'));
                outputData += `${ipRange}\n`;
            } else {
                console.log(chalk.red.bold('Failed'));
            }
        }
        saveToFile(outputFilePath, outputData);
        console.log('\nDone.');
    } else {
        console.log(chalk.red.bold('No IP addresses found in the file.'));
    }
}

function saveToFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content);
        console.log(`===========================================================`);
        console.log(chalk.green.bold(`Data saved successfully in ${filePath}`));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

mainWithDelay();
