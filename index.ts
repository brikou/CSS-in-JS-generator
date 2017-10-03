// tslint:disable no-console

import * as archiver from "archiver";
import { createWriteStream, readFileSync } from "fs";
import { format } from "prettier";

import { convertCssForEmotion } from "./lib/convertCssForEmotion";

const convertedCss = convertCssForEmotion(
    readFileSync("/dev/stdin").toString(),
);

const writeStream = createWriteStream("/dev/stdout");

const archive = archiver("tar", {
    gzip: true,
    gzipOptions: {
        level: 1,
    },
});

archive.on("error", (error) => {
    throw error;
});

archive.pipe(writeStream);

convertedCss.forEach((source, name) => {
    // trick to force prettier to prettify injectGlobal template literal
    if (name === "index.js") {
        source = source.replace("injectGlobal`", "css`");
    }
    source = format(source, {
        parser: "typescript",
        tabWidth: 4,
    });
    if (name === "index.js") {
        source = source.replace("css`", "injectGlobal`");
    }

    archive.append(source, { name });
});

archive.finalize();
