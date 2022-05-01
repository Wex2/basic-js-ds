const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.treeRoot = null;
    }

    root() {
        return this.treeRoot;
    }

    add(data) {
        const addWithin = (node, addedNode) => {
            if (addedNode.data > node.data) {
                if (node.right === null) node.right = addedNode;
                else addWithin(node.right, addedNode);
            }
            if (addedNode.data < node.data) {
                if (node.left === null) node.left = addedNode;
                else addWithin(node.left, addedNode);
            }
        }
        const addedNode = new Node(data);
        if (this.treeRoot === null) this.treeRoot = addedNode;
        else addWithin(this.treeRoot, addedNode);
    }

    searchWithin(node, data) {
        if (!node) return null;
        if (data < node.data) return this.searchWithin(node.left, data);
        else if (data > node.data) return this.searchWithin(node.right, data);
        else return node;
    }

    has(data) {
        return this.searchWithin(this.treeRoot, data) !== null;
    }

    find(data) {
        return this.searchWithin(this.treeRoot, data);
    }

    remove(data) {
        const removeNode = function (node, data) {
            if (!node) return null;
            if (data === node.data) {
                if (!node.left && !node.right) return null;
                if (!node.left) return node.right;
                if (!node.right) return node.left;
                let item = node.right;
                while (item.left) {
                    item = item.left;
                }
                node.data = item.data;
                node.right = removeNode(node.right, item.data);
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        this.treeRoot = removeNode(this.treeRoot, data);
    }

    min() {
        const findMin = (node) => {
            if (node.left === null) return node;
            return findMin(node.left);
        }
        return findMin(this.treeRoot).data;
    }

    max() {
        const findMax = (node) => {
            if (node.right === null) return node;
            return findMax(node.right);
        }
        return findMax(this.treeRoot).data;
    }
}

module.exports = {
    BinarySearchTree
};