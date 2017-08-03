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

    console.log(requestable)

    function myEval(cmd, context, filename, callback) {
        let parsed = cmd.match(/^([^~]*)~([^~]*)$/)

        if(parsed === null){
            callback(null, 'Sorry I cannot understand that')
            return
        }else{
            console.log(`${parsed[1]}~${parsed[2]}`)
        }

        let contact = requestable[parsed[1]]

        if(contact === null){
            callback(null, 'Sorry I cannot understand that')
            return
        }

        let result = contact.put(parsed[2])

        callback(null, result);
    }

    repl.start({ prompt: 'What will you order sir? ', eval: myEval });

    return app
}
