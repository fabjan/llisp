//
// TODO
//
function pluginControlFlow(_, specialForms, _) {
    Object.assign(specialForms, {
        'and': ([ast], env) => { throw new Error('not implemented') },
        'or': ([ast], env) => { throw new Error('not implemented') },
        'cond': ([ast], env) => { throw new Error('not implemented') },
        'while': ([ast], env) => { throw new Error('not implemented') },
    })
}