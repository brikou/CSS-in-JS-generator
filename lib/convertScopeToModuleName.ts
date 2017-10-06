import camelCase = require("camel-case");
import pascalCase = require("pascal-case");

export function convertScopeToModuleName(scope: string) {
    if (scope[0] === "." || scope === "root") {
        return camelCase(scope).replace(
            // tslint:disable-next-line max-line-length
            /^(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)$/,
            "_$1",
        );
    }

    return pascalCase(scope);
}
