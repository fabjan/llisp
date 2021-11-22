//
// read, eval, print are simple meta programming tools
//
function pluginMetaPrimitives(_, _, primitives) {

    Object.assign(primitives, {
        read: ([s]) => read(s.slice(1, -1)),
        eval: ([ast], env) => eval(ast, env.push()), // N.B cannot update env
        print: ([ast]) => print(ast),
        defs: (_, env) => env.names(),
    });

}