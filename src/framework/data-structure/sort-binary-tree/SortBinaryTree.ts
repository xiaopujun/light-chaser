class Node<K, V> {
    key: K;
    value: V;
    left: Node<K, V> | null;
    right: Node<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export default class SortBinaryTree<K, V> {
    root: Node<K, V> | null;

    constructor() {
        this.root = null;
    }

    // 添加节点
    insert(key: K, value: V): void {
        this.root = this._insert(this.root, key, value);
    }

    private _insert(node: Node<K, V> | null, key: K, value: V): Node<K, V> {
        if (node === null) {
            return new Node(key, value);
        }

        if (key < node.key) {
            node.left = this._insert(node.left, key, value);
        } else if (key > node.key) {
            node.right = this._insert(node.right, key, value);
        } else {
            // 如果已存在相同的键，则更新值
            node.value = value;
        }

        return node;
    }

    // 删除节点
    delete(key: K): void {
        this.root = this._delete(this.root, key);
    }

    private _delete(node: Node<K, V> | null, key: K): Node<K, V> | null {
        if (node === null) {
            return null;
        }

        if (key < node.key) {
            node.left = this._delete(node.left, key);
        } else if (key > node.key) {
            node.right = this._delete(node.right, key);
        } else {
            // 当找到匹配的键时

            // 情况1: 没有子节点
            if (node.left === null && node.right === null) {
                return null;
            }

            // 情况2: 有一个子节点
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            // 情况3: 有两个子节点
            const successor = this._findMin(node.right);
            node.key = successor.key;
            node.value = successor.value;
            node.right = this._delete(node.right, successor.key);
        }

        return node;
    }

    // 查找节点
    find(key: K): Node<K, V> | null {
        return this._find(this.root, key);
    }

    private _find(node: Node<K, V> | null, key: K): Node<K, V> | null {
        if (node === null) {
            return null;
        }

        if (key < node.key) {
            return this._find(node.left, key);
        } else if (key > node.key) {
            return this._find(node.right, key);
        } else {
            return node;
        }
    }

    // 更新节点
    update(key: K, value: V): void {
        const node = this.find(key);
        if (node !== null) {
            node.value = value;
        }
    }

    // 遍历二叉树 - 中序遍历
    inOrderTraversal(callback: (key: K, value: V) => void): void {
        this._inOrderTraversal(this.root, callback);
    }

    private _inOrderTraversal(node: Node<K, V> | null, callback: (key: K, value: V) => void): void {
        if (node !== null) {
            this._inOrderTraversal(node.left, callback);
            callback(node.key, node.value);
            this._inOrderTraversal(node.right, callback);
        }
    }

    // 辅助函数: 找到最小节点
    private _findMin(node: Node<K, V>): Node<K, V> {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}

// 示例用法
const bst = new SortBinaryTree<number, string>();

bst.insert(5, 'Five');
bst.insert(3, 'Three');
bst.insert(7, 'Seven');
bst.insert(2, 'Two');
bst.insert(4, 'Four');
bst.update(4, 'Four - updated');

// 中序遍历
bst.inOrderTraversal((key, value) => console.log(key, value));

