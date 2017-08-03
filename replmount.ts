import {Domain, CallIn, Debug, Cell} from 'jungle-core'
const repl = require('repl');

export function mount(domain:Domain, rawapp){

    let app = new Cell(rawapp)
    app.prime()

    let contacts = app.shell.designate('**:*')

    let requestable = {}
    for(let token in contacts){
        if(contacts[token ] instanceof CallIn){
            requestable[token] = contacts[token]
        }
    }

    function myEval(cmd, context, filename, callback) {
        let parsed = cmd.match(/^([^~]*)~([^~]*)$/)

        if(parsed === null){
            callback(null, 'Sorry, you must use a tilde')
            return
        }

        let contact = requestable[parsed[1]]

        if(contact === undefined){
            let valid = Object.keys(requestable).join(', ')
            callback(null, `Sorry, I cannot understand that, the only valid commands are ${valid}`)
            return
        }

        let result = contact.put(parsed[2])

        callback(null, result);
    }

    repl.start({ prompt: 'What will you order sir/madam? ', eval: myEval });

    return app
}
