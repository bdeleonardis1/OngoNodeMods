/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:merge-remaining-full-stops
 * @fileoverview Merge non-terminal-marker full stops into
 *   previous or next adjacent words.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var nlcstToString = require('nlcst-to-string');
var visitChildren = require('unist-util-visit-children');
var expressions = require('../expressions');

/*
 * Constants.
 *
 * - Blacklist of full stop characters that should not
 *   be treated as terminal sentence markers: A
 *   case-insensitive abbreviation.
 */

var EXPRESSION_TERMINAL_MARKER = expressions.terminalMarker;

/**
 * Merge non-terminal-marker full stops into
 * the previous word (if available), or the next
 * word (if available).
 *
 * @param {NLCSTNode} child - Node.
 */
function mergeRemainingFullStops(child) {
    var children = child.children;
    var position = children.length;
    var hasFoundDelimiter = false;
    var grandchild;
    var prev;
    var next;
    var nextNext;

    while (children[--position]) {
        grandchild = children[position];

        if (
            grandchild.type !== 'SymbolNode' &&
            grandchild.type !== 'PunctuationNode'
        ) {
            /*
             * This is a sentence without terminal marker,
             * so we 'fool' the code to make it think we
             * have found one.
             */

            if (grandchild.type === 'WordNode') {
                hasFoundDelimiter = true;
            }

            continue;
        }

        /*
         * Exit when this token is not a terminal marker.
         */

        if (!EXPRESSION_TERMINAL_MARKER.test(nlcstToString(grandchild))) {
            continue;
        }

        /*
         * Ignore the first terminal marker found
         * (starting at the end), as it should not
         * be merged.
         */

        if (!hasFoundDelimiter) {
            hasFoundDelimiter = true;

            continue;
        }

        /*
         * Only merge a single full stop.
         */

        if (nlcstToString(grandchild) !== '.') {
            continue;
        }

        prev = children[position - 1];
        next = children[position + 1];

        if (prev && prev.type === 'WordNode') {
            nextNext = children[position + 2];

            /*
             * Continue when the full stop is followed by
             * a space and another full stop, such as:
             * `{.} .`
             */

            if (
                next &&
                nextNext &&
                next.type === 'WhiteSpaceNode' &&
                nlcstToString(nextNext) === '.'
            ) {
                continue;
            }

            /*
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /*
             * Add the punctuation mark at the end of the
             * previous node.
             */

            prev.children.push(grandchild);

            /*
             * Update position.
             */

            if (grandchild.position && prev.position) {
                prev.position.end = grandchild.position.end;
            }

            position--;
        } else if (next && next.type === 'WordNode') {
            /*
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /*
             * Add the punctuation mark at the start of
             * the next node.
             */

            next.children.unshift(grandchild);

            if (grandchild.position && next.position) {
                next.position.start = grandchild.position.start;
            }
        }
    }
}

/*
 * Expose `mergeRemainingFullStops` as a plugin.
 */

module.exports = visitChildren(mergeRemainingFullStops);
