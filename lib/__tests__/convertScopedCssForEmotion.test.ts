import { convertScopedCssForEmotion } from "../convertScopedCssForEmotion";

test("convertScopedCssForEmotion", () => {
    [
        [
            [
                `@media print {
    .badge {
        border: 1px solid #000;
    }
}

.badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
}

.badge:empty {
    display: none;
}

.badge::before {
    content: "\\2014 \\00A0";
}
`,
                ".badge",
                new Set(["root", ".badge"]),
            ],
            `@media print {
    & {
        border: 1px solid #000;
    }
}


    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;


&:empty {
    display: none;
}

&::before {
    content: "\\\\2014 \\\\00A0";
}
`,
        ],
        [
            [
                `.alert-primary {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
}

.alert-primary hr {
    border-top-color: #9fcdff;
}

.alert-primary .alert-link {
    color: #002752;
}
`,
                ".alert-primary",
                new Set(["root", ".alert-primary", ".alert-link"]),
            ],
            `
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;


& hr {
    border-top-color: #9fcdff;
}

& .\${alertLink()} {
    color: #002752;
}
`,
        ],
    ].forEach(([[scopedCss, scope, scopes], scopedCssForEmotion]) => {
        expect(
            convertScopedCssForEmotion(
                scopedCss as string,
                scope as string,
                scopes as Set<string>,
            ),
        ).toEqual(scopedCssForEmotion);
    });
});
