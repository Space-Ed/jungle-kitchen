### Jungle Kitchen

an example jungle app that models a real restaurant environment.

#### Usage

```
npm start

welcome to a kitchen

What will you order sir? :orderIn~grilled eggplant and cashew cream wrap

'Food for grilled eggplant and cashew cream wrap\n'

```

#### Explanation

A jungle app is usually comprised of three parts:

    a) A domain to pull patterns from

    b) A main cell seed to start with

    c) a mount to start the app and hook into the platform

In this app

    a) our domain will include the various parts of the kitchen both roles and equipment.

    b) our main cell will be an instance of a kitchen, with all its specific trapings

    c) our mount is a repl input that lets us interact with the kitchen through commands.

#### Development

Any area of the kitchen could be developed independently.

__Customers__:
    transition from one repl customer to many customers attached as http clients. We can add in test clients that measure the quality of service within our kitchen.

__Kitchen__:
    transition to modelling of asynchronous food processes, first as simple maps from orders to results, then starting to model the internal state of the kitchen and the composition of ingredients.

__Service__:
    model the relationships between service staff customers, and the interpretation of customer requests.

__Management__:
    our management could be responsible for provisioning new staff, ordering supplies and
