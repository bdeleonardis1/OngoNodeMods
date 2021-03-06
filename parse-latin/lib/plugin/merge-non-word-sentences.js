/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:merge-non-word-sentences
 * @fileoverview Merge a sentence into the following
 *   sentence, when the sentence does not contain word
 *   tokens.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var modifyChildren = require('unist-util-modify-children');

/**
 * Merge a sentence into the following sentence, when
 * the sentence does not contain word tokens.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 * @return {undefined|number}
 */
function mergeNonWordSentences(child, index, parent) {
    var children = child.children;
    var position = -1;
    var prev;
    var next;

    while (children[++position]) {
        if (children[position].type === 'WordNode') {
            return;
        }
    }

    prev = parent.children[index - 1];

    if (prev) {
        prev.children = prev.children.concat(children);

        /*
         * Remove the child.
         */

        parent.children.splice(index, 1);

        /*
         * Patch position.
         */

        if (prev.position && child.position) {
            prev.position.end = child.position.end;
        }

        /*
         * Next, iterate over the node *now* at
         * the current position (which was the
         * next node).
         */

        return index;
    }

    next = parent.children[index + 1];

    if (next) {
        next.children = children.concat(next.children);

        /*
         * Patch position.
         */

        if (next.position && child.position) {
            next.position.start = child.position.start;
        }

        /*
         * Remove the child.
         */

        parent.children.splice(index, 1);
    }
}

/*
 * Expose `mergeNonWordSentences` as a modifier.
 */

module.exports = modifyChildren(mergeNonWordSentences);
