import * as path from "path";

import { getScopePath } from "./getScopePath";

export function getScopeRelativePath(
    fromScope: string,
    toScope: string,
    knownScopes: Set<string>,
): string {
    return path.relative(
        path.dirname(getScopePath(fromScope, knownScopes)),
        getScopePath(toScope, knownScopes),
    );
}
