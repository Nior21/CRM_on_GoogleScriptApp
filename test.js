/**
 * TESTS
 */
function test() {
  const json = [{
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
  const Sidebar1 = new mySidebar(json)
  return Sidebar1.show()
}