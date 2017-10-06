// tslint:disable no-console

import { readFileSync } from "fs";
import { format } from "prettier";

import { convertCssForEmotion } from "./lib/convertCssForEmotion";

const convertedCss = convertCssForEmotion(
    readFileSync("/dev/stdin").toString(),
);

console.log(
    format(
        convertedCss.replace(
            /(injectGlobal|styled)`/g,
            "/* $1 */ css`",
        ),
        {
            parser: "typescript",
            tabWidth: 4,
        },
    ).replace(/\/\* (injectGlobal|styled) \*\/ css`/g, "$1`"),
);
