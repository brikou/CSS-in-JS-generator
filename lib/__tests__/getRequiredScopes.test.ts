import { getRequiredScopes } from "../getRequiredScopes";

test("getRequiredScopes", () => {
    const css = `
        .alert-primary {
            color: #004085;
            background-color: #cce5ff;
            border-color: #b8daff;
        }

        .alert-primary hr {
            border-top-color: #9fcdff;
        }

        .alert-primary .alert-link:hover {
            color: #002752;
        }
    `;
    const scope = ".alert-primary";
    const knownScopes = new Set([
        "root",
        ".alert-link",
        ".alert-primary",
        ".badge",
    ]);
    const requiredScopes = new Set([".alert-link"]);

    expect(getRequiredScopes(css, scope, knownScopes)).toEqual(requiredScopes);
});
