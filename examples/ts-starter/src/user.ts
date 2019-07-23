import { define, Model, AttributesMixin } from '@type-r/models';
import { restfulIO } from '@type-r/endpoints';

@define
export class User extends Model {
    static endpoint = restfulIO( '/api/users', {
        mockData : [ // <- remove it to enable REST I/O
            { id : 0, name : 'John', email : 'john@gmail.com', birthsday : "1991-10-12T00:00:00.000Z" },
            { id : 1, name : 'Mark', email : 'mark@gmail.com', birthsday : "1990-10-12T00:00:00.000Z" }
        ] 
    })

    static attributes = {
        name : '',
        email : '',
        birthsday : Date,
        active : false
    }
}

export interface User extends AttributesMixin< typeof User >{}