"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jungle_core_1 = require("jungle-core");
var repl = require('repl');
function mount(domain, rawapp) {
    var app = new jungle_core_1.Cell(rawapp);
    app.prime();
    var contacts = app.shell.designate('**:*');
    var requestable = {};
    for (var token in contacts) {
        if (contacts[token] instanceof jungle_core_1.CallIn) {
            requestable[token] = contacts[token];
        }
    }
    console.log(requestable);
    function myEval(cmd, context, filename, callback) {
        var parsed = cmd.match(/^([^~]*)~([^~]*)$/);
        if (parsed === null) {
            callback(null, 'Sorry I cannot understand that');
            return;
        }
        else {
            console.log(parsed[1] + "~" + parsed[2]);
        }
        var contact = requestable[parsed[1]];
        if (contact === null) {
            callback(null, 'Sorry I cannot understand that');
            return;
        }
        var result = contact.put(parsed[2]);
        callback(null, result);
    }
    repl.start({ prompt: 'What will you order sir? ', eval: myEval });
    return app;
}
exports.mount = mount;
