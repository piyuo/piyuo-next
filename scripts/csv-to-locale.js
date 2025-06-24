#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

/**
 * Converts CSV translations file to Next.js locale JSON files
 * Usage: node scripts/csv-to-locale.js
 */

const CSV_FILE_PATH = path.join(__dirname, '../csv/translations.csv');
const MESSAGES_DIR = path.join(__dirname, '../messages');
const APP_PREFIX = 'app_';

function main() {
  try {
    console.log('🔄 Converting CSV translations to locale files...');

    // Read and parse CSV file
    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    console.log(`📊 Found ${records.length} translation keys`);

    // Get all locale columns (columns that start with APP_PREFIX)
    const headers = Object.keys(records[0]);
    const localeColumns = headers.filter(header => header.startsWith(APP_PREFIX));

    console.log(`🌐 Found ${localeColumns.length} locales:`, localeColumns.map(col => col.replace(APP_PREFIX, '')));

    // Create locale objects
    const localeData = {};

    // Initialize locale objects
    localeColumns.forEach(column => {
      const locale = column.replace(APP_PREFIX, '');
      localeData[locale] = {};
    });

    // Process each record (translation key)
    records.forEach(record => {
      const key = record.Key;
      if (!key) {
        console.warn('⚠️  Skipping record with empty key:', record);
        return;
      }

      localeColumns.forEach(column => {
        const locale = column.replace(APP_PREFIX, '');
        const translation = record[column];

        // Handle missing translations
        if (translation && translation.trim()) {
          localeData[locale][key] = translation.trim();
        } else {
          console.warn(`⚠️  Missing translation for key "${key}" in locale "${locale}"`);
          // Optionally set to empty string or keep the key for fallback
          localeData[locale][key] = '';
        }
      });
    });

    // Ensure messages directory exists
    if (!fs.existsSync(MESSAGES_DIR)) {
      fs.mkdirSync(MESSAGES_DIR, { recursive: true });
    }

    // Write locale files
    let createdFiles = 0;
    let updatedFiles = 0;

    Object.entries(localeData).forEach(([locale, translations]) => {
      const localeDir = path.join(MESSAGES_DIR, locale);
      const localeFilePath = path.join(localeDir, 'page.json');

      // Create locale directory if it doesn't exist
      if (!fs.existsSync(localeDir)) {
        fs.mkdirSync(localeDir, { recursive: true });
      }

      // Check if file exists to determine if it's an update or creation
      const fileExists = fs.existsSync(localeFilePath);

      // Write JSON file with proper formatting
      const jsonContent = JSON.stringify(translations, null, 2);
      fs.writeFileSync(localeFilePath, jsonContent + '\n', 'utf-8');

      if (fileExists) {
        updatedFiles++;
        console.log(`✅ Updated: ${localeFilePath}`);
      } else {
        createdFiles++;
        console.log(`🆕 Created: ${localeFilePath}`);
      }
    });

    console.log(`\n🎉 Conversion completed successfully!`);
    console.log(`📂 Created ${createdFiles} new files`);
    console.log(`🔄 Updated ${updatedFiles} existing files`);
    console.log(`📍 Total locales processed: ${Object.keys(localeData).length}`);

    // Generate summary
    const totalKeys = Object.keys(localeData[Object.keys(localeData)[0]] || {}).length;
    console.log(`🔑 Total translation keys: ${totalKeys}`);

  } catch (error) {
    console.error('❌ Error converting CSV to locale files:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
