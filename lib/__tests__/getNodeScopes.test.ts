import * as postcss from "postcss";

import { getNodeScopes } from "../getNodeScopes";

test("getNodeScopes", () => {
    [
        [
            postcss.parse(`
                @media print {
                    *,
                    *::before,
                    *::after {
                        text-shadow: none !important;
                        box-shadow: none !important;
                    }

                    pre {
                        white-space: pre-wrap !important;
                    }

                    .navbar {
                        display: none;
                    }
                }
            `).first,
            new Set(["root", ".navbar"]),
        ],
        [
            postcss.parse(`
                @keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
                    0%,
                    68.2% {
                        -webkit-transform: scaleX(0);
                        transform: scaleX(0);
                    }

                    68.2% {
                        -webkit-animation-timing-function: cubic-bezier(
                            0,
                            0,
                            0,
                            1
                        );
                        animation-timing-function: cubic-bezier(0, 0, 0, 1);
                    }

                    100% {
                        -webkit-transform: scaleX(1);
                        transform: scaleX(1);
                    }
                }
            `).first,
            new Set(["root"]),
        ],
        [
            postcss.parse(`
                @-webkit-keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
                    0%,
                    68.2% {
                        -webkit-transform: scaleX(0);
                        transform: scaleX(0);
                    }

                    68.2% {
                        -webkit-animation-timing-function: cubic-bezier(
                            0,
                            0,
                            0,
                            1
                        );
                        animation-timing-function: cubic-bezier(0, 0, 0, 1);
                    }

                    100% {
                        -webkit-transform: scaleX(1);
                        transform: scaleX(1);
                    }
                }
            `).first,
            new Set(["root"]),
        ],
        [
            postcss.parse(`
                @-webkit-keyframes progress-bar-stripes {
                    from {
                        background-position: 1rem 0;
                    }

                    to {
                        background-position: 0 0;
                    }
                }
            `).first,
            new Set(["root"]),
        ],
        [
            postcss.parse(`
                @-ms-viewport {
                    width: device-width;
                }
            `).first,
            new Set(["root"]),
        ],
        [
            postcss.parse(`
                .container {
                    margin-right: auto;
                    margin-left: auto;
                    padding-right: 15px;
                    padding-left: 15px;
                    width: 100%;
                }
            `).first,
            new Set([".container"]),
        ],
        [
            postcss.parse(`
                h1,
                .h1 {
                    font-size: 2.5rem;
                }
            `).first,
            new Set(["root", ".h1"]),
        ],
        [
            postcss.parse(`
                /*! Copyright 2017 Acme, Inc. */
            `).first,
            new Set(["root"]),
        ],
    ].forEach(([node, nodeScopes]) => {
        expect(getNodeScopes(node as postcss.Node)).toEqual(nodeScopes);
    });
});
