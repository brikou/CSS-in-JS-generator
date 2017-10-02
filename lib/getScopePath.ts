export function getScopePath(scope: string, knownScopes: Set<string>): string {
    if (scope === "root") {
        return "index.js";
    }

    const separatorIndexes: number[] = [];
    const separatorRegExp = /[-_]+/g;
    while (true) {
        const separatorMatch = separatorRegExp.exec(scope);
        if (separatorMatch === null) {
            break;
        }

        const separatorPrefix = scope.substring(0, separatorMatch.index);
        const separatorSuffix = scope
            .substring(`${separatorPrefix}${separatorMatch}`.length)
            .split(separatorRegExp, 1);

        if (
            [...knownScopes]
                .filter((knownScope) => knownScope.indexOf(separatorPrefix) === 0)
                .every(
                    (knownScope) =>
                        knownScope.indexOf(
                            `${separatorPrefix}${separatorMatch}${separatorSuffix}`,
                        ) === 0,
                ) === false
        ) {
            separatorIndexes.push(separatorMatch.index);
        }
    }

    const pathFragments: string[] = [];
    for (let i = 0; i <= separatorIndexes.length; i++) {
        const start = separatorIndexes[i - 1] || 0;
        const end = separatorIndexes[i];
        pathFragments.push(scope.substring(start, end));
    }

    let path = pathFragments
        .map((pathFragment) => pathFragment.replace(/^[-_.]+/, ""))
        .join("/");

    if (
        [...knownScopes].some(
            (knownScope) =>
                knownScope !== scope && knownScope.indexOf(scope) === 0,
        )
    ) {
        // path += "/index";
    }

    path += ".js";

    return path;
}
