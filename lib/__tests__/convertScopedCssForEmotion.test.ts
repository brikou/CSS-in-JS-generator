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

& .\${alertLink} {
    color: #002752;
}
`,
        ],
        [
            [
                `@media print {
    pre {
        white-space: pre-wrap !important;
    }

    pre {
        border: 1px solid #999;
        page-break-inside: avoid;
    }
}

pre {
    font-family: monospace, monospace;
    font-size: 1em;
}

pre {
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
}

pre {
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
        monospace;
}

pre {
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 90%;
    color: #212529;
}

pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
    border-radius: 0;
}
`,
                "pre",
                new Set(["root", "code", "pre"]),
            ],
            `@media print {
    & {
        white-space: pre-wrap !important;
    }

    & {
        border: 1px solid #999;
        page-break-inside: avoid;
    }
}


    font-family: monospace, monospace;
    font-size: 1em;



    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;



    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
        monospace;



    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 90%;
    color: #212529;


& code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
    border-radius: 0;
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
