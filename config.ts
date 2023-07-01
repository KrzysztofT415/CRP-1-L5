export default class CONFIG {
    static MODE_PROPERTIES = [
        {
            name: 'mode',
            description: 'Mode (A/B) > ',
            validator: /^(A|B)$/,
            warning: 'Invalid mode',
            type: 'string',
            required: true
        }
    ]
    static PASSWORD_PROPERTIES = [
        {
            name: 'password',
            description: 'Password > ',
            type: 'string'
        }
    ]
    static XA_PROPERTIES = [
        {
            name: 'XA',
            description: 'XA > ',
            type: 'string'
        }
    ]
    static XB_PROPERTIES = [
        {
            name: 'XB',
            description: 'XB > ',
            type: 'string'
        }
    ]

    static E1_PROPERTIES = [
        {
            name: 'E1',
            description: 'E1 > ',
            type: 'string'
        }
    ]
    static E2_PROPERTIES = [
        {
            name: 'E2',
            description: 'E2 > ',
            type: 'string'
        }
    ]
    static E3_PROPERTIES = [
        {
            name: 'E3',
            description: 'E3 > ',
            type: 'string'
        }
    ]
}
