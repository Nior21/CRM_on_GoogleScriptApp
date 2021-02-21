<p>
<a href="https://github.com/Nior21/CRM_on_GoogleScriptApp/issues" title="issues">
<img src="https://img.shields.io/github/issues/Nior21/CRM_on_GoogleScriptApp" alt="issues"/></a>

<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Nior21/CRM_on_GoogleScriptApp">

<img alt="Discord" src="https://img.shields.io/discord/812724054728638501?logo=discord">

<img alt="GitHub watchers" src="https://img.shields.io/github/watchers/Nior21/CRM_on_GoogleScriptApp?style=social">
</p>


## Описание

Цель проекта разработать универсальные скрипты, а так же удобный интерфейс для ежедневной работы с [Google Sheets 🔗](https://sheets.google.com).

Прикладное направление автоматизации посвящено ведению истории работы с клиентами и синхронизации данных со сторонними разработками через их API, такими как Redmine и Telegram.

## Работа с проектом локально

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Для синхронизации вашего проекта Google с клоном данного репозитория можно использую утилиту [clasp 🔗](https://github.com/google/clasp).

Заходим в папку будущего проекта через любой `terminal` подходящий для вашей системы и вводим следующие команды:
* `npm install -g @google/clasp` - установка clasp (если опустить `-g` то установится в папку проекта)
* `npm i -S @types/google-apps-script` - описание классов GAS
* `clasp login` - авторизуемся под своей учетной записью Google
* `clasp clone <ScriptID>` -
клонируем данные проекта с соответствующим ID к себе на компьютер
  
Далее в работе используем следующие команды
* `clasp pull` - получаем изменения из нашего проекта (с GoogleDrive) в нашу локальную копию
* `clasp push` - отправляем локальные изменения обратно в проект
* `clasp push --watch` - включаем постоянное отслеживание и отправку изменений (крайне полезная функция!)

Стоит обратить внимание на еще один метод clasp позволяющий запускать функции прямо из внешней IDE:
* `clasp run <myFunction>`
  
Правда есть два нюанса его использования:
1) Скорее всего вам придется перевести проект на работу в [Google Cloud Platform](https://console.cloud.google.com/home). В этом вам поможет соответствующая [инструкции 🔗](https://github.com/google/clasp/blob/master/docs/run.md).
2) А для функций открывающих `sidebar` и `prompt` окна команда `run` вернет исключение:
`ScriptError Exception: Cannot call SpreadsheetApp.getUi() from this context.`, т.к. согласно политике Google Script App запрещено запускать клиентский JavaScript без прямого подтверждения пользователя. Используйте привязку функций к "изображениям поверх ячеек" или собственным пунктам меню.

Больше информации по работе с утилитой можно найти в ее официальной [документации по clasp 🔗](https://developers.google.com/apps-script/guides/clasp) и в аналогичной [документации по использованию в TypeScript 🔗](https://developers.google.com/apps-script/guides/typescript).

В вашей системе может отсутствовать утилита npm если вы ранее не устанавливали [NodeJS 🔗](https://nodejs.org/).

⚡ Powered by the [Apps Script API](https://developers.google.com/apps-script/api/)