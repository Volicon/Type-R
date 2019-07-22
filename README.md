# Type-R Model Framework

Type-R models solves the problem of JSON not being able to handle complex JS data types, safeguards both frontend and backend from errors in JSON structure, 


1. Programmer's mistake on frontend can't affect the JSON sent to ther server.
2. Wrong JSON received from the server will be sanitazed and can't cause catastrophic failures on the frontend.

3. Mapping of complex JS types to JSON (such as Date) is automatic which eliminates a possibility for a programmer's mistake and improves productivity. Less code to write means less things to unit test, less bugs to fix, and less code to understand when making changes.

4. Reduced cost of testing. There are virtually no point in unit-testing Type-R models as they are mostly declarative definitions. They are able to check the structural integrity of JSON data themselves, and Type-R can be instructed to throw exceptions instead of console logs in case of type assertion errors. It makes the unit tests of the data layer unnecessary, and greately reduces efforts for the integration test.

5. Deeply observable data structures.










Type-R models is the powerful JSON serialization engine for browsers, NodeJS, JavaScript, and TypeScript. Type-R models is a language to declaratively describe the mapping between JS classes and JSON data your backend or microservice provides, and then Type-R will do the rest.



- *Record* classes with typed attributes.
- Ordered *collections* of records.
- *Stores* are records with a set of collections in its attributes used to resolve id-references in JSON.
- *IOEndpoints* is an entity encapsulating I/O transport which represent the persistent collection of records.

Type-R is completely unopinionated on a client-server transport protocol and the view layer technology. It's your perfect M and VM in modern MVVM or MVC architecture.

```javascript
import { define, Record, Collection } from '@type-r/models'
import { restfulIO } from '@type-r/endpoints'

@define class User extends Record {
    static attributes = {
        name  : '',
        email : ''
    }
}

@define class Message extends Record {
    static endpoint = restfulIO( '/api/messages' );

    static attributes = {
        createdAt : Date,
        author  : User, // aggregated User record.
        to      : Collection.of( User ), // aggregating collection of users
        subject : '',
        body    : ''
    }
}

const messages = Collection.of( Message ).create();

await messages.fetch({ params : { page : 0 }});

const msg = messages.first();
msg.author.name = 'Alan Poe';
msg.subject = 'Nevermore';

await msg.save();
```

## Architecture

![overview](docs/images/overview.png)


## [Documentation](https://volijs.github.io/Type-R/)

## Installation and requirements

Is packed as UMD and ES6 module. No peer dependencies are required.

`npm install type-r --save-dev`

<aside class="success">IE10+, Edge, Safari, Chrome, and Firefox are supported</aside>

<aside class="warning">IE9 and Opera may work but has not been tested. IE8 won't work.</aside>

