#!/usr/bin/env node

const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

// Get CSV file path from command line argument
const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('Usage: node scripts/convert-csv-to-json.js <path-to-csv-file>');
  process.exit(1);
}

// Check if file exists
if (!fs.existsSync(csvFilePath)) {
  console.error(`Error: File not found: ${csvFilePath}`);
  process.exit(1);
}

// Generate output JSON file path (same directory, same name, .json extension)
const jsonFilePath = csvFilePath.replace(/\.csv$/i, '.json');

console.log(`Converting ${csvFilePath} to ${jsonFilePath}...`);

// Convert CSV to JSON
csv()
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    // Write JSON file with pretty formatting (2 spaces indentation)
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
    console.log(`✓ Successfully converted ${jsonArray.length} records to ${jsonFilePath}`);
  })
  .catch((error) => {
    console.error('Error converting CSV to JSON:', error);
    process.exit(1);
  });
