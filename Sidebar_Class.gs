/**
 * INIT CLASSES
 */

class mySidebar {
    /**
     * Класс mySidebar позволяет создавать сайдбары удобным способом с заранее сформулированными методами и свойства
     * @param {object} json
     * @param {string} title - Sidebar name настроек которые надо удалить
     */
    constructor(json, title = "Sidebar") {
        this.title = title
        this.json = json
        const obj = []
        Object.keys ( json ).forEach ( (value, key) => {
            //console.log(`json[${key}].${value}:`, json[value])
            switch (value) {
                case "label":
                    obj[key] = new myLabel ( json[value] )
                    break
                case "button":
                    obj[key] = new myButton ( json[value] )
                    break
            }
            obj[key].log ()
        } )

    }

    log() {
        console.log (
            `mySidebar(
        title=${ this.title },
        json=${ JSON.stringify ( this.json ) }
        )`
        )
    }

    /**
     * Метод открывает 'sidebar'. Интерфейс описан в sidebar.html
     * https://developers.google.com/apps-script/reference/base/ui#showsidebaruserinterface
     */
    show() {
        SpreadsheetApp.getUi ()
            .showSidebar ( HtmlService.createTemplateFromFile ( 'Sidebar_Template' )
                .evaluate ()
                .setTitle ( this.title ) );
    }
}

class myButton {
    /**
     * myButton
     * @param title
     * @param scriptName
     * @param url
     * @param listener
     */
    constructor({title, scriptName, url, listener}) {
        this.title = title
        this.scriptName = scriptName
        this.url = url
    }

    log() {
        console.log (
            `myButton(
        title=${ this.title },
        scriptName=${ this.scriptName },
        url=${ this.url },
        listener=${ this.listener }
        )`
        )
    }
}

class myLabel {
    /**
     * myLabel
     * @param title
     * @param listener
     */
    constructor({title, listener}) {
        this.title = title
        this.listener = listener
    }

    log() {
        console.log (
            `myLabel(
        title=${ this.title },
        listener=${ this.listener }
        )`
        )
    }
}

/**
 * TESTS
 */

const json = {
    label: {
        title: "label",
        listener: "listener"
    },
    button: {
        title: "button",
        scriptName: "script",
        url: "https://#"
    },
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile ( filename )
        .getContent ();
}

const test = () => {
    const Sidebar1 = new mySidebar(json)
    return Sidebar1.show()
}