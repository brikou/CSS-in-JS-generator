import { convertScopedCssForEmotion } from "./convertScopedCssForEmotion";
import { convertScopeToModuleName } from "./convertScopeToModuleName";
import { getCssIndexedByScope } from "./getCssIndexedByScope";

export function convertCssForEmotion(css: string): string {
    let cssForEmotion = "";

    const cssIndexedByScope = getCssIndexedByScope(css);

    if (cssIndexedByScope.has("root")) {
        if (cssIndexedByScope.size > 1) {
            cssForEmotion += 'import { css, injectGlobal } from "emotion";\n';
        } else {
            cssForEmotion += 'import { injectGlobal } from "emotion";\n';
        }
    } else if (cssIndexedByScope.size > 0) {
        cssForEmotion += 'import { css } from "emotion";\n';
    }

    const knownScopes = new Set([...cssIndexedByScope.keys()]);

    const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    });

    [...knownScopes]
        .sort((scopeA, scopeB) => {
            if (scopeA === "root") {
                return -1;
            }

            return collator.compare(scopeA, scopeB);
        })
        .forEach((scope) => {
            cssForEmotion += "\n";

            const convertedScopedCssForEmotion = convertScopedCssForEmotion(
                cssIndexedByScope.get(scope) as string,
                scope,
                knownScopes,
            );

            if (scope === "root") {
                cssForEmotion += `export default () => injectGlobal\`${convertedScopedCssForEmotion}\`;\n`;
            } else {
                cssForEmotion += `export const ${convertScopeToModuleName(
                    scope,
                )} = () => css\`${convertedScopedCssForEmotion}\`;\n`;
            }
        });

    return cssForEmotion;
}
