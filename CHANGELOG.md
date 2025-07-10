# Changelog

## [1.3.0](https://github.com/piyuo/piyuo-next/compare/v1.2.0...v1.3.0) (2025-07-10)


### Features

* add chore and refactor commit types to main branch [#111](https://github.com/piyuo/piyuo-next/issues/111) ([d881292](https://github.com/piyuo/piyuo-next/commit/d8812927ebbb00e0b4406a725ea9dca8fa3ab983))
* add hreflang utilities for SEO optimization and update metadata generation [#115](https://github.com/piyuo/piyuo-next/issues/115) ([807a3ee](https://github.com/piyuo/piyuo-next/commit/807a3ee5b2abc031655a7667d2c601ab9617a427))
* enable search engine indexing for all locale pages [#115](https://github.com/piyuo/piyuo-next/issues/115) ([fe2757f](https://github.com/piyuo/piyuo-next/commit/fe2757fadeef8fc12c64645ba82d3da5da08b62d))


### Bug Fixes

* missing permissions block in commitlint workflow [#104](https://github.com/piyuo/piyuo-next/issues/104) ([b1c1227](https://github.com/piyuo/piyuo-next/commit/b1c122717fef7af06dc97689bd6eb0e470f65ca4))
* uncomment deployment condition in workflow [#99](https://github.com/piyuo/piyuo-next/issues/99) ([1b37254](https://github.com/piyuo/piyuo-next/commit/1b37254248fe0f8e2f564ce83158ff4a8e1ed452))
* update wrangler action version to v3 and set wranglerVersion to 4 [#99](https://github.com/piyuo/piyuo-next/issues/99) ([409c49c](https://github.com/piyuo/piyuo-next/commit/409c49c3d599d5a66657878debd17e924201b8fa))
* update wrangler to version 4.23.0 and adjust deployment condition in workflow [#99](https://github.com/piyuo/piyuo-next/issues/99) ([9d03739](https://github.com/piyuo/piyuo-next/commit/9d03739349ea2226e53d6f5b46d81ab5ec5832ca))

## [1.2.0](https://github.com/piyuo/piyuo-next/compare/v1.1.0...v1.2.0) (2025-07-04)


### Features

* add favicon and test media file from old piyuo.com project [#93](https://github.com/piyuo/piyuo-next/issues/93) ([ec3e8ff](https://github.com/piyuo/piyuo-next/commit/ec3e8ffd79fde864a17f64d497fd380b525caa83))
* add favicon.png and manifest.json to project [#87](https://github.com/piyuo/piyuo-next/issues/87) ([0c49809](https://github.com/piyuo/piyuo-next/commit/0c4980901ee7314b5e3f724d47159e87eccfa276))
* **locale:** implement middleware for locale detection and routing with ISR support [#84](https://github.com/piyuo/piyuo-next/issues/84) ([6bd04c4](https://github.com/piyuo/piyuo-next/commit/6bd04c41043eee92fd2d9b6a531117e186988153))
* rewrite static html legal documents to next.js/react with multi-language support [#97](https://github.com/piyuo/piyuo-next/issues/97) ([c713b27](https://github.com/piyuo/piyuo-next/commit/c713b276a16771c2dccb2555b8a50d6a74b94c44))
* update deploy.yml for opennextjs/cloudflare in github workflow [#91](https://github.com/piyuo/piyuo-next/issues/91) ([7c848cc](https://github.com/piyuo/piyuo-next/commit/7c848cc15ac1dcbe398eddd2a0c4d88274d52bf4))


### Bug Fixes

* **build:** add .wrangler to .gitignore and update preview script for compatibility [#84](https://github.com/piyuo/piyuo-next/issues/84) ([eb53413](https://github.com/piyuo/piyuo-next/commit/eb53413cd7548af897bd20762b236f9ef144aedb))
* compile issue when run pnpm review [#95](https://github.com/piyuo/piyuo-next/issues/95) ([6b5db01](https://github.com/piyuo/piyuo-next/commit/6b5db01225f5e42d7b0d103488255fb8c9415521))
* **deploy:** add environment variable for Google Analytics ID in build step [#84](https://github.com/piyuo/piyuo-next/issues/84) ([816741e](https://github.com/piyuo/piyuo-next/commit/816741ee1f962c98e7718594d800d5241647a397))
* **deploy:** comment out conditional deployment trigger [#84](https://github.com/piyuo/piyuo-next/issues/84) ([55985e8](https://github.com/piyuo/piyuo-next/commit/55985e87105a3240c213ad9518720d02d3af290e))
* **deploy:** uncomment conditional for release commit deployment [#84](https://github.com/piyuo/piyuo-next/issues/84) ([814fa26](https://github.com/piyuo/piyuo-next/commit/814fa26ef196f327116679ecd52807ee9bf65ced))
* **deploy:** update deployment workflow to use Corepack [#84](https://github.com/piyuo/piyuo-next/issues/84) ([12bcc90](https://github.com/piyuo/piyuo-next/commit/12bcc9022771814b3d4a88aa50325c4e1605a30a))
* enhance RootPage with comprehensive error handling for Cloudflare Pages [#89](https://github.com/piyuo/piyuo-next/issues/89) ([4e26b98](https://github.com/piyuo/piyuo-next/commit/4e26b98a625c7c0b5b82702bbc833e0e22b740da))
* **locale:** update priority locales to include Traditional and Simplified Chinese [#84](https://github.com/piyuo/piyuo-next/issues/84) ([1491468](https://github.com/piyuo/piyuo-next/commit/149146832a79625d8c7943cd8ab9546792c1a275))
* uncomment deployment condition in workflow [#91](https://github.com/piyuo/piyuo-next/issues/91) ([37fb3af](https://github.com/piyuo/piyuo-next/commit/37fb3afd2966ab08d3f53f8d1118ad9a4d73a3e8))

## [1.1.0](https://github.com/piyuo/piyuo-next/compare/v1.0.0...v1.1.0) (2025-06-30)


### Features

* **main:** add google analytics to the project [#81](https://github.com/piyuo/piyuo-next/issues/81) ([024ace8](https://github.com/piyuo/piyuo-next/commit/024ace83dfd464f18f2bdbe1710eaf4b22aab970))

## 1.0.0 (2025-06-30)


### Features

* add cleanup script execution after branch creation in start-issue.sh [#39](https://github.com/piyuo/piyuo-next/issues/39) ([e1fcf08](https://github.com/piyuo/piyuo-next/commit/e1fcf08248db6daec519d90f91727af5871f8630))
* add compatibility flags and date to wrangler configuration [#79](https://github.com/piyuo/piyuo-next/issues/79) ([5310a51](https://github.com/piyuo/piyuo-next/commit/5310a51660cf762fe79fa646946db0d165d9ee0e))
* add multilingual support with English and Chinese translations [#13](https://github.com/piyuo/piyuo-next/issues/13) ([91de855](https://github.com/piyuo/piyuo-next/commit/91de8552de0ca7380c32d2587c69a0c82a976f21))
* add next-intl multiple language [#13](https://github.com/piyuo/piyuo-next/issues/13) ([397bc0d](https://github.com/piyuo/piyuo-next/commit/397bc0dac5a245f5eb4f16040844a1338f002cbb))
* add script to cleanup merged issue branches [#27](https://github.com/piyuo/piyuo-next/issues/27) ([6b00b8f](https://github.com/piyuo/piyuo-next/commit/6b00b8fe2644c12daf0d153a9baaa69824c29a53))
* automate label assignment based on issue title prefix [#39](https://github.com/piyuo/piyuo-next/issues/39) ([33e1f0a](https://github.com/piyuo/piyuo-next/commit/33e1f0a68a97bc999e3617f27377c544217e3fdc))
* **build:** integrate cloudflare next-on-pages into project and github deploy action [#61](https://github.com/piyuo/piyuo-next/issues/61) ([b67fb16](https://github.com/piyuo/piyuo-next/commit/b67fb16f3a358e94b80c187bdf017a73fb443e65))
* **CI:** create dependabot.yml for security [#80](https://github.com/piyuo/piyuo-next/issues/80) ([fc0cfb7](https://github.com/piyuo/piyuo-next/commit/fc0cfb724b6b7781ab1248e73d89c35dee4c6526))
* convert csv to next.js locale files [#49](https://github.com/piyuo/piyuo-next/issues/49) ([de8bfcb](https://github.com/piyuo/piyuo-next/commit/de8bfcbba4c65bac9d57d4f71710547c1e0b2b87))
* create squash-commits.sh script to simplify commit squashing before PRs [#65](https://github.com/piyuo/piyuo-next/issues/65) ([3314e9a](https://github.com/piyuo/piyuo-next/commit/3314e9a849ef53fde5018b1a69ee50cc11713b76))
* **deploy:** migrate from SSG to ISR with Cloudflare Pages deployment [#59](https://github.com/piyuo/piyuo-next/issues/59) ([3e48532](https://github.com/piyuo/piyuo-next/commit/3e48532ee91e18322e45572a2f271cbacd7bffcb))
* enabling blank issue [#35](https://github.com/piyuo/piyuo-next/issues/35) ([2402f28](https://github.com/piyuo/piyuo-next/commit/2402f28f0211923fae543c8f7418d58f2be7ffce))
* enhance start-issue script to assign current user and manage 'needs-triage' label [#51](https://github.com/piyuo/piyuo-next/issues/51) ([a583b30](https://github.com/piyuo/piyuo-next/commit/a583b3027d169b1363c7776673c893b222018705))
* **i18n:** enhance language selector with dynamic language label support [#77](https://github.com/piyuo/piyuo-next/issues/77) ([6b86884](https://github.com/piyuo/piyuo-next/commit/6b86884dda747222bfa2941edd0649a2cd4a6b0b))
* **i18n:** implement dynamic language selector with full navigation [#77](https://github.com/piyuo/piyuo-next/issues/77) ([75a0720](https://github.com/piyuo/piyuo-next/commit/75a07209e22a6fa2c246764d444d49d1c3fa5ad8))
* implement deployment to cloudflare pages and workers [#79](https://github.com/piyuo/piyuo-next/issues/79) ([08ba346](https://github.com/piyuo/piyuo-next/commit/08ba34652f4be88d20f0044a3f813e6368f0e343))
* migrate flutter page to next.js/react page [#55](https://github.com/piyuo/piyuo-next/issues/55) ([3e5b857](https://github.com/piyuo/piyuo-next/commit/3e5b8575d7c78b7931cfa4bb7f4bd695f4d1b5d2))
* update deployment configuration for Cloudflare Pages and adjust Node.js version [#79](https://github.com/piyuo/piyuo-next/issues/79) ([06af322](https://github.com/piyuo/piyuo-next/commit/06af322aa8de4f82d16e66d33c08588b03770d33))


### Bug Fixes

* add --push option to gh pr create command to eliminate interactive prompt [#77](https://github.com/piyuo/piyuo-next/issues/77) ([cec4052](https://github.com/piyuo/piyuo-next/commit/cec4052a97343e060cde604bf0b338a98af47642))
* adjust formatting in AGENTS.md and remove unnecessary line in CONTRIBUTING.md [#75](https://github.com/piyuo/piyuo-next/issues/75) ([65bef64](https://github.com/piyuo/piyuo-next/commit/65bef6470edabc88f5541f9952c6617b5d237a89))
* **app:** resolve main page compilation issue with async language loading [#53](https://github.com/piyuo/piyuo-next/issues/53) ([622250c](https://github.com/piyuo/piyuo-next/commit/622250cf049c364a850761cdcc0893afc7311aba))
* clientpagewrapper uses outdated fixed translations instead of next-intl [#73](https://github.com/piyuo/piyuo-next/issues/73) ([dcfc3d2](https://github.com/piyuo/piyuo-next/commit/dcfc3d24011585cb5a46e175ddcd92d71548f2dc))
* hydration error due to mismatched html lang attribute in next.js [#69](https://github.com/piyuo/piyuo-next/issues/69) ([9ebbe66](https://github.com/piyuo/piyuo-next/commit/9ebbe66726a840202537bc2809e970614a079ae7))
* Release Please PRs cannot add labels due to missing labels: write permission [#21](https://github.com/piyuo/piyuo-next/issues/21) ([6ff28c5](https://github.com/piyuo/piyuo-next/commit/6ff28c56e144ce5fc3ca2d2ae08ba6ed881e52ef))
* Release Please PRs cannot add labels due to missing labels: write permission [#25](https://github.com/piyuo/piyuo-next/issues/25) ([01d1d87](https://github.com/piyuo/piyuo-next/commit/01d1d876364b85e169a8d7bcccea956c9d43d6c2))
* remove language code display from dropdown menu in EnhancedLanguageSelector [#77](https://github.com/piyuo/piyuo-next/issues/77) ([e53bc7a](https://github.com/piyuo/piyuo-next/commit/e53bc7ae3e870c629083bbfb49f8930d76a238c6))
* The Replease please workflow action is no longer working [#15](https://github.com/piyuo/piyuo-next/issues/15) ([f969bf4](https://github.com/piyuo/piyuo-next/commit/f969bf4902ec9f1524b974d14d243b5b35fd02dc))
* uncomment deployment condition in GitHub Actions workflow and add 'vercel' to cSpell dictionary [#79](https://github.com/piyuo/piyuo-next/issues/79) ([6e497ef](https://github.com/piyuo/piyuo-next/commit/6e497ef308734bd8194eb0b0ea63e177a53164fd))
