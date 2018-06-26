import * as prettier from "prettier";

import { getCssIndexedByScope } from "./lib/getCssIndexedByScope";

async function main(css: string, scopes: Set<string>) {
    const cssIndexedByScope = getCssIndexedByScope(css);

    let cssWithScope = "";
    let cssWithoutScope = "";

    for (const scope of cssIndexedByScope.keys()) {
        if (scopes.has(scope)) {
            cssWithScope += cssIndexedByScope.get(scope);
        } else {
            cssWithoutScope += cssIndexedByScope.get(scope);
        }
    }

    // tslint:disable-next-line:no-console
    console.log(
        prettier.format(cssWithScope, {
            ...await prettier.resolveConfig(process.cwd()),
            parser: "css",
        }),
    );
    // tslint:disable-next-line:no-console
    console.error(
        prettier.format(cssWithoutScope, {
            ...await prettier.resolveConfig(process.cwd()),
            parser: "css",
        }),
    );
}

(async () => {
    let css = "";

    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (data) => {
        css += data;
    });

    process.stdin.on("end", async () => {
        const scopes = new Set(process.argv.slice(2));

        try {
            await main(css, scopes);
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error(error);
            process.exit(1);
        }
    });
})();

/*
wget https://unpkg.com/bootstrap@4.1.1/dist/css/bootstrap.min.css

cat bootstrap.min.css | node split-css-by-scopes.js \
    .btn \
    .btn-primary \
    .btn-secondary \
        > withScope.css 2> withoutScope.css
*/
