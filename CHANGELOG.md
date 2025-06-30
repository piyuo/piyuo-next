# Changelog

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
