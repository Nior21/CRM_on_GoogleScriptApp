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
        this.html = ""
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
            //console.log ( this.html )
        } )
    }

    log() {
        console.log (
            `title: ${ this.title },
            json: ${ JSON.stringify ( this.json ) },`
        )
    }

    /**
     * Метод позволяет сделать тест открытия 'sidebar'.
     * https://developers.google.com/apps-script/reference/base/ui#showsidebaruserinterface
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

    /**
     * Метод открывает 'sidebar'.
     * https://developers.google.com/apps-script/reference/base/ui#showsidebaruserinterface
     */
    show() {
        SpreadsheetApp.getUi ().showSidebar ( HtmlService
            .createHtmlOutput ( this.html )
            .setTitle ( this.title ) ); // создаем HtmlOutput
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
            `<input type=\"button\" value=\"${ this.title }\" ${ this.listener } \\>`
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
            `<input type=\"input\" value=\"${ this.title }\" ${ this.listener } \\>`
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
 * @param filename
 * @returns {string}
 */
const include = (filename) => {
    return HtmlService.createHtmlOutputFromFile ( filename )
        .getContent ();
}

