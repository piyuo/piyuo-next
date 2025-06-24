# CSV to Next.js Locale Converter

This script converts CSV translation files to Next.js compatible JSON locale files.

## Overview

The `csv-to-locale.js` script processes a CSV file containing translations for multiple locales and generates individual JSON files for each locale in the `messages/` directory, compatible with Next.js internationalization and the `next-intl` library.

## CSV Format

The CSV file should have the following structure:

```csv
Key,app_en,app_fr,app_es,app_de,...
welcome,Welcome,Bienvenue,Bienvenido,Willkommen,...
goodbye,Goodbye,Au revoir,Adiós,Auf Wiedersehen,...
```

- **First column**: Translation keys
- **Subsequent columns**: Translations for each locale, prefixed with `app_`
- **Column naming**: `app_` + locale code (e.g., `app_en`, `app_fr`, `app_zh_CN`)

## Usage

### Prerequisites

Make sure you have the required dependencies installed:

```bash
pnpm install csv-parse
```

### Running the Script

```bash
# From the project root
node scripts/csv-to-locale.js
```

### Input and Output

- **Input**: `csv/translations.csv`
- **Output**: Individual JSON files in `messages/{locale}/page.json`

### Example Output Structure

```text
messages/
├── en/
│   └── page.json
├── fr/
│   └── page.json
├── es/
│   └── page.json
└── zh/
    └── page.json
```

Each `page.json` file contains:

```json
{
  "welcome": "Welcome",
  "goodbye": "Goodbye",
  "title": "My App"
}
```

## Features

- ✅ **Automatic locale detection**: Finds all columns starting with `app_` prefix
- ✅ **Fallback handling**: Handles missing translations gracefully
- ✅ **Directory creation**: Automatically creates locale directories
- ✅ **Update detection**: Distinguishes between new files and updates
- ✅ **Validation**: Warns about missing translations or empty keys
- ✅ **Proper formatting**: Generates properly formatted JSON with 2-space indentation

## Supported Locales

The script supports all locales found in the CSV file. Currently supports 83+ locales including:

- Base locales: `en`, `fr`, `es`, `de`, `zh`, `ja`, `ko`, etc.
- Regional variants: `en_US`, `en_GB`, `en_AU`, `fr_CA`, `es_AR`, `zh_CN`, `zh_HK`, etc.

## Integration with Next.js

After running the script, the generated locale files can be used with:

1. **next-intl**: The primary internationalization library
2. **Next.js i18n routing**: For automatic locale detection and routing
3. **Dynamic imports**: For efficient client-side locale loading

## Error Handling

The script handles various edge cases:

- **Missing translations**: Logs warnings and sets empty strings
- **Empty keys**: Skips records with missing keys
- **File system errors**: Provides clear error messages
- **Invalid CSV format**: Graceful error handling with exit codes

## Automation

To automate the conversion process, you can:

1. **Add to package.json scripts**:

   ```json
   {
     "scripts": {
       "i18n:convert": "node scripts/csv-to-locale.js"
     }
   }
   ```

2. **Set up pre-commit hooks** to run conversion automatically

3. **Integrate with CI/CD** for automated locale file updates

## Future Enhancements

Potential improvements:

- [ ] Support for nested JSON structures
- [ ] Pluralization rules handling
- [ ] Validation against existing keys
- [ ] Reverse conversion (JSON to CSV)
- [ ] Integration with translation management systems

## Troubleshooting

### Common Issues

1. **CSV file not found**: Ensure `csv/translations.csv` exists
2. **Permission errors**: Check write permissions for `messages/` directory
3. **Malformed CSV**: Validate CSV format and encoding (UTF-8 recommended)
4. **Memory issues**: For very large CSV files, consider streaming parsing

### Debug Mode

To enable verbose logging, modify the script or add console.log statements as needed.
