/**
 * INIT CLASSES
 */

class mySidebar {
    /**
     * Класс mySidebar позволяет создавать sidebars удобным способом с заранее сформулированными методами и свойства
     * @param {object} json
     * @param {string} title - Sidebar name настроек которые надо удалить
     */
    constructor(json, title = "Sidebar") {
        this.title = title
        this.json = json
        this.html =
            "<script>\n" +
            "   const handlerClick () {\n" +
            "       console.log(\"Button clicked\")\n" +
            "   } \n" +
            "   google.script.run.withSuccessHandler(handlerClick).test_settings_log()\n" +
            "</script>\n"
        const obj = []
        Object.keys ( json ).forEach ( (value, key) => {
            //console.log ( `json[${ key }].${ json[value].type }:`, json[value] )
            switch (json[value].type) {
                case "input":
                    obj[key] = new Input ( json[value] )
                    break
                case "button":
                    obj[key] = new Button ( json[value] )
                    break
            }
            obj[key].log ()
            this.html += obj[key].getHtml () + "<br>\n"
            console.log ( this.html )
        } )
    }

    /**
     * Метод позволяет сделать тест открытия 'sidebar'.
     * https://developers.google.com/apps-script/reference/base/ui#showsidebaruserinterface
     * https://developers.google.com/apps-script/guides/properties
     */
    test() {
        const html = HtmlService.createTemplate (
            "Hello, world! <input type=\"button\" value=\"Close\" onclick=\"google.script.host.close()\" />"
        )
            .evaluate ()
            .setTitle ( "Test sidebar" )

        SpreadsheetApp.getUi ()
            .showSidebar ( HtmlService.createHtmlOutput ( html ) )
    }

    log() {
        console.log (
            `title: ${ this.title },
            json: ${ JSON.stringify ( this.json ) },`
        )
    }

    /**
     * Метод открывает 'sidebar'.
     * https://developers.google.com/apps-script/reference/base/ui#showsidebaruserinterface
     */
    show() {
        SpreadsheetApp.getUi ().showSidebar ( HtmlService
            .createHtmlOutput ( this.html )
            .setTitle ( this.title ) ); // создаем HtmlOutput
    }

    /**
     *  Функция записывает настройки указанные в полях ввода в Свойства проекта
     *  https://developers.google.com/apps-script/reference/properties/properties?hl=en
     *  @param {object} settings Список настроек которые надо сохранить
     *  @return {boolean} True или False
     */
    setSettings(settings) {
        for (let i = 0; i < settings.length; i++) {
            PropertiesService.getDocumentProperties ().setProperty ( i, settings[i] );
        }
        return True;
    }

    /**
     *  Метод получает конфигурацию html-формы Sidebar из Properties проекта
     *  https://developers.google.com/apps-script/reference/properties/properties?hl=en
     *  @return {object} properties_key Список настроек которые надо сохранить
     */
    getSettings() {
        let properties_key = PropertiesService.getDocumentProperties ().getKeys ();
        return console.log ( properties_key );
    }

    /**
     *  Функция принудительной чистки ненужных данных из ScriptProperties
     *  https://developers.google.com/apps-script/reference/properties/properties?hl=en
     *  @param {object} settings Список настроек которые надо удалить
     *  @return {boolean} True или False
     */
    deleteSettings(settings) {
        for (let i = 0; i < settings.length; i++) {
            ScriptProperties.deleteProperty ( "i" );
        }
        return True;
    }
}

class Button {
    /**
     * Button class
     * @param title
     * @param listener
     * @param url
     * @param child
     */
    constructor({
                    title = 'undefined_button',
                    listener,
                    url = 'undefined_url',
                }) {
        this.title = title
        this.listener = listener
        this.url = url
    }

    getHtml() {
        return HtmlService.createTemplate (
            `<input type=\"button\" value=\"${ this.title }\" ${ this.listener }>`
        ).evaluate ().getContent ()
    }

    log() {
        console.log (
            `
            title: ${ this.title },
            url: ${ this.url },
            listener: ${ this.listener },
            `
        )
    }
}

class Input {
    /**
     * Input class
     * @param title
     * @param listener
     * @param child
     */
    constructor({
                    title = "input",
                    listener
                }) {
        this.title = title
        this.listener = listener
    }

    getHtml() {
        return HtmlService.createTemplate (
            `<input type=\"input\" value=\"${ this.title }\" ${ this.listener }>`
        ).evaluate ().getContent ()
    }

    log() {
        console.log (
            `
            title: ${ this.title },
            listener: ${ this.listener },
            `
        )
    }
}


/**
 * TESTS
 */

const test = () => {
    const json = [
        {
            type: "input",
            title: "test_input"
        },
        {
            type: "button",
            title: "test_button",
            listener: "onclick=\"google.script.host.close()\"",
            url: "https://#"
        },
        {
            type: "input",
            title: "test_input"
        },
        {
            type: "input",
            title: "test_input"
        },
        {
            type: "button",
            title: "test_button",
            listener: "onclick=\"google.script.host.close()\"",
            url: "https://#"
        },
        {
            type: "button",
            title: "test_button",
            listener: "onclick=\"google.script.host.close()\"",
            url: "https://#"
        },
        {
            type: "input",
            title: "test_input",
            spell: "fire"
        },
    ]
    const Sidebar1 = new mySidebar ( json )
    return Sidebar1.show ()
}


/**
 * ANOTHER FUNCTION
 */

/**
 * Include external files
 * https://developers.google.com/apps-script/guides/html/best-practices
 * https://developers.google.com/apps-script/guides/html/templates#printing_scriptlets
 * @param filename
 * @returns {string}
 */
const include = (filename) => {
    return HtmlService.createHtmlOutputFromFile ( filename )
        .getContent ();
}