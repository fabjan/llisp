//
// macros let users define code operating on the AST before evaluation
//
function pluginMacros(_, specialForms, _) {

    Object.assign(specialForms, {
        defmacro: ([name, impl], env) => {
            impl = eval(impl, env);
            if (!(impl instanceof Function)) throw new Error('macro implementation must be a fn');
            impl.isMacro = true;
            env.set(name, impl);
        },
        macroexpand: ([ast], env) => macroExpand(ast, env),
    });

    function macroExpand(ast, env) {
        const head = eval(ast[0], env);
        if (head && head.isMacro) {
            return macroExpand(head(...ast.slice(1)), env);
        }
        return ast;
    }

    // TODO: take a "machine" parameter instead of replacing a global function binding
    const baseEval = eval;

    eval = (ast, env) => {
        if (ast instanceof Array) {
            ast = macroExpand(ast, env)
        }
        return baseEval(ast, env);
    };

}