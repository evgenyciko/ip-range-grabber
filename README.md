# IP Range Grabber

IP Range Grabber is a command-line tool written in Node.js that extracts IP ranges from a list of IP addresses. It utilizes web scraping techniques to retrieve IP range information from the RDAP (Registration Data Access Protocol) database. This tool is useful for network administrators, cybersecurity professionals, and developers who need to analyze IP address ranges quickly and efficiently.

## Features

- Extracts IP ranges from a list of IP addresses.
- Utilizes RDAP API to fetch IP range information.
- Supports handling large lists of IP addresses.
- Provides detailed output including success and failure statuses.
- Easy-to-use command-line interface.

## Installation

Before running the tool, make sure you have Node.js and npm (Node Package Manager) installed on your system. Then, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ip-range-grabber.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ip-range-grabber
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Prepare a text file (`ip.txt`) containing a list of IP addresses.
2. Run the tool using Node.js and provide the path to the input file:

   ```bash
   node ip_range_grabber.js
   ```

3. The tool will fetch the IP range information for each IP address and generate an output file (`output_ip_range.txt`) with the extracted ranges.

## Dependencies

- [axios](https://www.npmjs.com/package/axios): For making HTTP requests to fetch data from the RDAP API.
- [cheerio](https://www.npmjs.com/package/cheerio): For parsing HTML data retrieved from web pages.
- [chalk](https://www.npmjs.com/package/chalk): For styling console output with colors.