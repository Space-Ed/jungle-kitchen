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
    function myEval(cmd, context, filename, callback) {
        var parsed = cmd.match(/^([^~]*)~([^~]*)$/);
        if (parsed === null) {
            callback(null, 'Sorry, you must use a tilde');
            return;
        }
        var contact = requestable[parsed[1]];
        if (contact === undefined) {
            var valid = Object.keys(requestable).join(', ');
            callback(null, "Sorry, I cannot understand that, the only valid commands are " + valid);
            return;
        }
        var result = contact.put(parsed[2]);
        callback(null, result);
    }
    repl.start({ prompt: 'What will you order sir/madam? ', eval: myEval });
    return app;
}
exports.mount = mount;
