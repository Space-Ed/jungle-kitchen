let Jungle = require('jungle-core')
let Core = Jungle.Core

let mount = require('./replmount.js').mount

Core.branch('app')
Core.extend('cell', 'app:kitchen', {
    domain:'app',
    form:{
        prime(){
            console.log('welcome to the kitchen')
        }
    },

    service:{ basis:"servicePortal" }
})

Core.branch('customer')


Core.extend('cell','app:servicePortal', {
    orders:{
        basis:"hook:call",
        direction:'out',
        mode:'pull'
    }

})

let app = {
    basis:'app:kitchen',
    form:{
        prime(){
            console.log('welcome to a kitchen')
        },

        media:['direct'],
        mesh:{
            'direct':[':orderIn->kitchen:orders']
        }
    },

    kitchen:{
        orders:{
            basis:'hook:call',
            direction:'in',
            mode:'pull',
            hook(order){
                return `Food for ${order}`
            }
        }
    },

    orderIn:{
        basis:'hook:call',
        direction:'in',
        mode:'pull'
    },

    stations:{

    },

    staff:{

    },

    customers:{
        domain:'customer',
        bob:{}
    }
}

mount(Core, app)
