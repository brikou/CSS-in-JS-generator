import { convertScopedCssForEmotion } from "./convertScopedCssForEmotion";
import { convertScopeToModuleName } from "./convertScopeToModuleName";
import { getCssIndexedByScope } from "./getCssIndexedByScope";
import { getRequiredScopes } from "./getRequiredScopes";

export function convertCssForEmotion(css: string): string {
    const cssIndexedByScope = getCssIndexedByScope(css);

    const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    });

    const knownScopes = new Set([...cssIndexedByScope.keys()]);

    const sortedKnownScopes = [...knownScopes]
        .sort((scopeA, scopeB) => {
            if (scopeA === "root") {
                return -1;
            }

            if (scopeA[0] === "." && scopeB[0] !== ".") {
                return +1;
            }

            if (scopeA[0] !== "." && scopeB[0] === ".") {
                return -1;
            }

            return collator.compare(scopeA, scopeB);
        })
        .reduce((previousSortedKnownScopes: Set<string>, knownScope) => {
            getRequiredScopes(
                cssIndexedByScope.get(knownScope) as string,
                knownScope,
                knownScopes,
            ).forEach((requiredScope) => {
                if (previousSortedKnownScopes.has(requiredScope) === false) {
                    previousSortedKnownScopes.add(requiredScope);
                }
            });

            if (previousSortedKnownScopes.has(knownScope) === false) {
                previousSortedKnownScopes.add(knownScope);
            }

            return previousSortedKnownScopes;
        }, new Set());

    let cssForEmotion = `import { ${[
        [...sortedKnownScopes].some((scope) => scope[0] === ".") ? "css" : "",
        sortedKnownScopes.has("root") ? "injectGlobal" : "",
    ]
        .filter(String)
        .join(", ")} } from "emotion";\n`;

    if (
        [...sortedKnownScopes].some(
            (scope) => scope !== "root" && scope[0] !== ".",
        )
    ) {
        cssForEmotion += 'import { styled } from "react-emotion";\n';
    }

    sortedKnownScopes.forEach((scope) => {
        cssForEmotion += "\n";

        const convertedScopedCssForEmotion = convertScopedCssForEmotion(
            cssIndexedByScope.get(scope) as string,
            scope,
            knownScopes,
        );

        if (scope === "root") {
            cssForEmotion += `injectGlobal\`${convertedScopedCssForEmotion}\`;\n`;
        } else {
            cssForEmotion += `export const ${convertScopeToModuleName(
                scope,
            )} = ${scope[0] === "."
                ? "css"
                : `styled.${scope}`}\`${convertedScopedCssForEmotion}\`;\n`;
        }
    });

    return cssForEmotion;
}
