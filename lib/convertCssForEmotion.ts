import * as path from "path";
import { format } from "prettier";

import { convertScopedCssForEmotion } from "./convertScopedCssForEmotion";
import { convertScopeToModuleName } from "./convertScopeToModuleName";
import { getCssIndexedByScope } from "./getCssIndexedByScope";
import { getRequiredScopes } from "./getRequiredScopes";
import { getScopePath } from "./getScopePath";
import { getScopeRelativePath } from "./getScopeRelativePath";

export function convertCssForEmotion(css: string): Map<string, string> {
    const cssForEmotion = new Map();
    const scopesByDirname: Map<string, Set<string>> = new Map();

    const cssIndexedByScope = getCssIndexedByScope(css);

    const knownScopes = new Set([...cssIndexedByScope.keys()]);

    cssIndexedByScope.forEach((currentCss, currentScope) => {
        let source = "";
        if (currentScope === "root") {
            source += 'import { injectGlobal } from "emotion";\n';
        } else {
            source += 'import { css } from "emotion";\n';
        }
        source += "\n";

        const requiredScopes = getRequiredScopes(
            currentCss,
            currentScope,
            knownScopes,
        );

        source += [...requiredScopes]
            .sort()
            .map((requiredScope) => {
                const mName = convertScopeToModuleName(requiredScope);
                const mFilename = getScopeRelativePath(
                    currentScope,
                    requiredScope,
                    knownScopes,
                );

                return `import { ${mName} } from "./${mFilename}";`
                    .replace("./../", "../")
                    .replace('.js"', '"');
            })
            .join("\n");
        source += "\n\n";

        const convertedScopedCssForEmotion = convertScopedCssForEmotion(
            currentCss,
            currentScope,
            knownScopes,
        );

        if (currentScope === "root") {
            source += `export default () => css\`${convertedScopedCssForEmotion}\`;\n`;
        } else {
            source += `export const ${convertScopeToModuleName(
                currentScope,
            )} = css\`${convertedScopedCssForEmotion}\`;\n`;
        }

        source = format(source, {
            parser: "typescript",
            tabWidth: 4,
        });

        if (currentScope === "root") {
            source = source.replace(/ css\`/m, " injectGlobal`");
        }

        const scopePath = getScopePath(currentScope, knownScopes);

        const dirname = path.dirname(scopePath);
        if (scopesByDirname.has(dirname) === false) {
            scopesByDirname.set(dirname, new Set());
        }
        scopesByDirname.get(dirname)!.add(currentScope);

        cssForEmotion.set(scopePath, source);
    });

    return cssForEmotion;
}
