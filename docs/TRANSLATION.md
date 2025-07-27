# 🌐 TRANSLATION System Overview

This project uses a **CSV-based translation workflow** to manage multilingual content efficiently across 70+ locales. This structure was designed to improve maintainability and batch-editing of phrases in a scalable way.

---

## 📁 Folder Structure

```bash
/translation
  page.csv
  terms.csv
  privacy.csv

/scripts
  build_translation.sh

/public/messages
  /en
    page.json
    terms.json
  /zh_CN
    page.json
    terms.json
  ...
```

- **/translation/**: Source of truth for all translatable text.
  - Each `.csv` file corresponds to a specific page or section.
  - Each file contains a matrix of keys and translations for all supported locales.
- **/public/messages/**: Output folder containing generated per-locale `.json` files.
- **/scripts/build_translation.sh**: Script that converts CSV files into JSON files per locale.

---

## 📑 CSV Format

Each CSV file in `/translation` follows this format:

```csv
key,en,zh_CN,fr
welcome,Welcome,欢迎,Bienvenue
terms_accept,Accept terms,接受条款,Accepter les conditions
```

- **First row**: Language codes. The first column must be `"key"`.
- **Each row**: A translatable phrase and its corresponding values in all languages.

---

## ⚙️ How to Build Translations

Run the following command from the root of the project:

```bash
./scripts/build_translation.sh
```

This script will:

1. Parse each `.csv` file in `/translation`
2. Create (or update) translation files like:
   - `/public/messages/en/page.json`
   - `/public/messages/zh_CN/page.json`
3. Overwrite existing files with the latest content.

### Usage Options

```bash
# Build all CSV files
./scripts/build_translation.sh

# Build a specific CSV file
./scripts/build_translation.sh page     # Build page.csv only
./scripts/build_translation.sh terms    # Build terms.csv only
./scripts/build_translation.sh privacy  # Build privacy.csv only

# Show help
./scripts/build_translation.sh --help
```

1. Parse each `.csv` file in `/translation`
2. Create (or update) translation files like:
   - `/public/messages/en/page.json`
   - `/public/messages/zh_CN/page.json`
3. Overwrite existing files with the latest content.

### Script Usage

```bash
# Build all CSV files
./scripts/build_translation.sh

# Build a specific CSV file
./scripts/build_translation.sh page     # Build page.csv only
./scripts/build_translation.sh terms    # Build terms.csv only
./scripts/build_translation.sh privacy  # Build privacy.csv only

# Show help
./scripts/build_translation.sh --help
```

> ⚠️ Do **not** manually edit the JSON files under `/public/messages`. They are **generated** automatically from the CSVs.

---

## 🧪 How to Add or Update a Phrase

1. Open the relevant `.csv` file in `/translation` (e.g. `page.csv`)
2. Add or edit the desired `key` and translation values
3. Run:

   ```bash
   ./scripts/build_translation.sh
   ```

4. Commit both the updated `.csv` and regenerated JSONs (optional).

---

## 🧠 Notes for AI Agents

- Always edit only the CSVs inside `/translation`
- Use the `key` column as the identifier for each string
- If adding a new key, ensure all required locales are included
- Run `./scripts/build_translation.sh` to apply changes

---

## 📌 Future Improvements (Optional Ideas)

- Integration with Google Sheets or translation platforms (e.g., Lokalise, Crowdin)
- Validation for missing translations
- CI check to warn if CSV and JSON files are out of sync

---

## ✅ Summary

- CSVs in `/translation` are the **source of truth**
- JSONs in `/public/messages/[locale]/[file].json` are **generated**
- Use `build_translation.sh` to compile the translations
