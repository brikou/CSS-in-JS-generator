import { format } from "prettier";

import { convertCssForEmotion } from "../convertCssForEmotion";

test("convertCssForEmotion", () => {
    const css = `*,
*::before,
*::after {
    box-sizing: inherit;
}

@-ms-viewport {
    width: device-width;
}

@media print {
    .badge {
        border: 1px solid #000;
    }
}

select.form-control:not([size]):not([multiple]) {
    height: calc(2.25rem + 2px);
}

.alert-dismissible .close {
    position: relative;
    top: -0.75rem;
    right: -1.25rem;
    padding: 0.75rem 1.25rem;
    color: inherit;
}

.alert-link {
    font-weight: bold;
}

.alert-primary {
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

.badge-danger {
    color: #fff;
    background-color: #dc3545;
}

.badge-danger[href]:focus,
.badge-danger[href]:hover {
    color: #fff;
    text-decoration: none;
    background-color: #bd2130;
}

.badge:empty {
    display: none;
}

.blockquote-footer {
    display: block;
    font-size: 80%;
    color: #868e96;
}

.blockquote-footer::before {
    content: "\\2014 \\00A0";
}

.close {
    float: right;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
}

.display-1 {
    font-size: 6rem;
    font-weight: 300;
    line-height: 1.1;
}

.display-2 {
    font-size: 5.5rem;
    font-weight: 300;
    line-height: 1.1;
}

.form-control::placeholder {
    color: #868e96;
    opacity: 1;
}
`;

    const expectedCssForEmotion = new Map([
        [
            "index.js",
            `import { injectGlobal } from "emotion";

export default () => injectGlobal\`
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    @-ms-viewport {
        width: device-width;
    }
\`;
`,
        ],
        [
            "alert/dismissible.js",
            `import { css } from "emotion";

import { close } from "../close";

export const alertDismissible = css\`
    & .\${close} {
        position: relative;
        top: -0.75rem;
        right: -1.25rem;
        padding: 0.75rem 1.25rem;
        color: inherit;
    }
\`;
`,
        ],
        [
            "alert/link.js",
            `import { css } from "emotion";

export const alertLink = css\`font-weight: bold;\`;
`,
        ],
        [
            "alert/primary.js",
            `import { css } from "emotion";

import { alertLink } from "./link";

export const alertPrimary = css\`
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;

    & hr {
        border-top-color: #9fcdff;
    }

    & .\${alertLink} {
        color: #002752;
    }
\`;
`,
        ],
        [
            "badge.js",
            `import { css } from "emotion";

export const badge = css\`
    @media print {
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
\`;
`,
        ],
        [
            "badge/danger.js",
            `import { css } from "emotion";

export const badgeDanger = css\`
    color: #fff;
    background-color: #dc3545;

    &[href]:focus,
    &[href]:hover {
        color: #fff;
        text-decoration: none;
        background-color: #bd2130;
    }
\`;
`,
        ],
        [
            "blockquote-footer.js",
            `import { css } from "emotion";

export const blockquoteFooter = css\`
    display: block;
    font-size: 80%;
    color: #868e96;

    &::before {
        content: "\\\\2014 \\\\00A0";
    }
\`;
`,
        ],
        [
            "close.js",
            `import { css } from "emotion";

export const close = css\`
    float: right;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;
\`;
`,
        ],
        [
            "display/1.js",
            `import { css } from "emotion";

export const display1 = css\`
    font-size: 6rem;
    font-weight: 300;
    line-height: 1.1;
\`;
`,
        ],
        [
            "display/2.js",
            `import { css } from "emotion";

export const display2 = css\`
    font-size: 5.5rem;
    font-weight: 300;
    line-height: 1.1;
\`;
`,
        ],
        [
            "form-control.js",
            `import { css } from "emotion";

export const formControl = css\`
    select&:not([size]):not([multiple]) {
        height: calc(2.25rem + 2px);
    }

    &::placeholder {
        color: #868e96;
        opacity: 1;
    }
\`;
`,
        ],
    ]);

    const actualCssForEmotion = convertCssForEmotion(css);
    [...actualCssForEmotion.keys()].forEach((filename) => {
        let source = actualCssForEmotion.get(filename) as string;
        // this makes prettier handle injectGlobal template literal
        if (filename === "index.js") {
            source = source.replace("injectGlobal`", "css`");
        }
        source = format(source, {
            parser: "typescript",
            tabWidth: 4,
        });
        if (filename === "index.js") {
            source = source.replace("css`", "injectGlobal`");
        }
        actualCssForEmotion.set(filename, source);
    });

    expect(actualCssForEmotion).toEqual(expectedCssForEmotion);
});
