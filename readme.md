<p>

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
</p>

---
## Описание репозитория

Цель проекта обеспечить синхронизацию 1С с [Google Sheets 🔗](https://sheets.google.com). Для данного проекта используются универсальные отчеты 1С и рассылка этих отчетов на почту `gmail`.

## Синхронизация проекта с Google Script App

Для синхронизации вашего проекта Google с клоном данного репозитория можно использую утилиту [clasp 🔗](https://github.com/google/clasp).

Заходим в папку будущего проекта через любой `terminal` подходящий для вашей системы и вводим следующие команды

Устанавливаем `clasp` (если опустить `-g` то установится в папку проекта) *

\* В вашей системе может отсутствовать утилита npm если вы ранее не устанавливали [NodeJS 🔗](https://nodejs.org/). Если это так то следуйте инструкции по установке с официального сайта.*

```
npm i -g @google/clasp
```

Авторизуемся под своей учетной записью Google
```
clasp login
```

Устанавливаем описания классов `GAS`
```
npm i -g @types/google-apps-script
```

клонируем данные проекта с соответствующим ID (`ScriptID`) к себе на компьютер
```
clasp clone <ScriptID>
```

## Получаем скрипты с Git
После клонирования проекта c GAS перезаписываем код информацией с репозитория
```
git clone <link>
```

## Настройки .gitingnore **
** Настройки потребуются если файлы .gitingnore и .claspignore утеряны. Просто создаем их заного.
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
/.idea
.idea
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
/.eslintcache
/.clasp.json
/.clasprc.json
```

## Настройки .claspignore **
```
# ignore all files…
**/**

# except the extensions…
!appsscript.json
!**/*.gs
!**/*.js
!**/*.ts
!**/*.html

# ignore even valid files if in…
.gitingnore
.git/**
node_modules/**
```

## Дальнейшая работа с Clasp  
Далее в работе используем следующие команды
* `clasp pull` - получаем изменения из нашего проекта (с GoogleDrive) в нашу локальную копию
* `clasp push` - отправляем локальные изменения обратно в проект
* `clasp push --watch` - включаем постоянное отслеживание и отправку изменений (крайне полезная функция!)

## Запуск функций из внешней IDE
Для полноценной работы с Google Script App стоит обратить внимание на еще один метод clasp позволяющий запускать функции прямо из внешней IDE:
* `clasp run <myFunction>`
  
Правда есть два нюанса его использования:
1) Скорее всего вам придется перевести проект на работу в [Google Cloud Platform](https://console.cloud.google.com/home). В этом вам поможет соответствующая [инструкции 🔗](https://github.com/google/clasp/blob/master/docs/run.md).
2) А для функций открывающих `sidebar` и `prompt` окна команда `run` вернет исключение:
`ScriptError Exception: Cannot call SpreadsheetApp.getUi() from this context.`, т.к. согласно политике Google Script App запрещено запускать клиентский JavaScript без прямого подтверждения пользователя. Используйте привязку функций к "изображениям поверх ячеек" или собственным пунктам меню.

## Ссылки
Больше информации по работе с утилитой можно найти в ее официальной [документации по clasp 🔗](https://developers.google.com/apps-script/guides/clasp) и в аналогичной [документации по использованию в TypeScript 🔗](https://developers.google.com/apps-script/guides/typescript).

---

⚡ Powered by the [Apps Script API](https://developers.google.com/apps-script/api/)

