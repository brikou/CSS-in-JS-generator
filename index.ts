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
            "export default () => injectGlobal",
            "export default () => css",
        ),
        {
            parser: "typescript",
            tabWidth: 4,
        },
    ).replace("export default () => css", "export default () => injectGlobal"),
);
