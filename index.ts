// tslint:disable no-console

import * as archiver from "archiver";
import { createWriteStream, readFileSync } from "fs";

import { convertCssForEmotion } from "./lib/convertCssForEmotion";

const convertedCss = convertCssForEmotion(readFileSync("/dev/stdin").toString());

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
    archive.append(source, { name });
});

archive.finalize();
