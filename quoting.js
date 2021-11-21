//
// quasiquoting unlocks macros' true potential
//
// TODO: splice-unquote
function pluginExtendedQuoting(readerMacros, specialForms, _) {

    Object.assign(specialForms, {
        quasiquote: ([ast], env) => eval(qqExpand(ast), env),
        // quasiquoteexpand: ([ast]) => qqExpand(ast), // for debugging
    });

    //
    // add some reader macros to make meta programming easier
    //
    // instead of ·· (quote (1 2 3))
    // you get ····· '(1 2 3)
    // instead of ·· (quasiquote (if (not (unquote a)) (unquote b) (unquote c))
    // you get ····· `(if (not ,a) ,b ,c)
    Object.assign(readerMacros, {
        "'": form => ['quote', form],
        "`": form => ['quasiquote', form],
        ",": form => ['unquote', form],
    });

    function qqExpand(ast) {
        if (ast instanceof Array && 0 < ast.length) {
            if (ast[0] === 'unquote')
                return ast[1];
            return ['cons', qqExpand(ast[0]), qqExpand(ast.slice(1))];
        }
        return ['quote', ast];
    }
}