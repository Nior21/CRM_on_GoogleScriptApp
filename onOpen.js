function onOpen () {
    // Создаём новый пункт меню
    SpreadsheetApp.getUi()
        .createMenu("Sidebar")
        .addItem("Test Settings", "test")
        .addItem("Test Settings", "showSidebar")
        .addToUi();
    // https://developers.google.com/apps-script/reference/base/ui#createmenucaption
    // https://developers.google.com/apps-script/reference/base/ui#createaddonmenu
}

const myListener = ""

const test_settings = new mySidebar(
    [
        {
            type: "input",
            title: "test_input"
        },
        {
            type: "button",
            title: "get",
            listener: "onclick=\"handlerClick\"",
            url: "https://#"
        },
    ],
    "Test Settings"
)

const showSidebar = () => {
    test_settings.show()
}

const test_settings_log = () => {
    console.log("test_settings_log run ok!")
}
