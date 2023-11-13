class AVLNode<K, V> {
    key: K;
    value: V;
    height: number;
    left: AVLNode<K, V> | null;
    right: AVLNode<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.height = 1; // 新插入的节点高度默认为1
        this.left = null;
        this.right = null;
    }
}

export default class AVLTree<K, V> {
    root: AVLNode<K, V> | null;

    constructor() {
        this.root = null;
    }

    // 获取节点高度
    private getHeight(node: AVLNode<K, V> | null): number {
        return node ? node.height : 0;
    }

    // 更新节点高度
    private updateHeight(node: AVLNode<K, V>): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    // 获取平衡因子
    private getBalanceFactor(node: AVLNode<K, V> | null): number {
        return this.getHeight(node?.left!) - this.getHeight(node?.right!);
    }

    // 右旋转
    private rightRotate(y: AVLNode<K, V>): AVLNode<K, V> {
        const x = y.left!;
        const T2 = x.right;

        // 执行旋转
        x.right = y;
        y.left = T2;

        // 更新高度
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    // 左旋转
    private leftRotate(x: AVLNode<K, V>): AVLNode<K, V> {
        const y = x.right!;
        const T2 = y.left;

        // 执行旋转
        y.left = x;
        x.right = T2;

        // 更新高度
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    // 平衡节点
    private balance(node: AVLNode<K, V>): AVLNode<K, V> {
        // 更新节点高度
        this.updateHeight(node);

        // 获取平衡因子
        const balanceFactor = this.getBalanceFactor(node);

        // 左子树高度 > 右子树高度，需要右旋转
        if (balanceFactor > 1) {
            if (this.getBalanceFactor(node.left) >= 0) {
                return this.rightRotate(node);
            } else {
                node.left = this.leftRotate(node.left!);
                return this.rightRotate(node);
            }
        }

        // 右子树高度 > 左子树高度，需要左旋转
        if (balanceFactor < -1) {
            if (this.getBalanceFactor(node.right) <= 0) {
                return this.leftRotate(node);
            } else {
                node.right = this.rightRotate(node.right!);
                return this.leftRotate(node);
            }
        }

        // 保持平衡
        return node;
    }

    // 插入节点
    insert(key: K, value: V): void {
        this.root = this._insert(this.root, key, value);
    }

    private _insert(node: AVLNode<K, V> | null, key: K, value: V): AVLNode<K, V> {
        if (!node) {
            return new AVLNode(key, value);
        }

        if (key < node.key) {
            node.left = this._insert(node.left, key, value);
        } else if (key > node.key) {
            node.right = this._insert(node.right, key, value);
        } else {
            // 如果已存在相同的键，则更新值
            node.value = value;
            return node;
        }

        // 平衡节点
        return this.balance(node);
    }

    // 删除节点
    delete(key: K): void {
        this.root = this._delete(this.root, key);
    }

    private _delete(node: AVLNode<K, V> | null, key: K): AVLNode<K, V> | null {
        if (!node) {
            return null;
        }

        if (key < node.key) {
            node.left = this._delete(node.left, key);
        } else if (key > node.key) {
            node.right = this._delete(node.right, key);
        } else {
            // 当找到匹配的键时

            // 情况1: 没有子节点或只有一个子节点
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                // 情况2: 有两个子节点
                const successor = this._findMin(node.right);
                node.key = successor.key;
                node.value = successor.value;
                node.right = this._delete(node.right, successor.key);
            }
        }

        if (!node) {
            return null;
        }

        // 平衡节点
        return this.balance(node);
    }

    // 查找节点
    find(key: K): AVLNode<K, V> | null {
        return this._find(this.root, key);
    }

    private _find(node: AVLNode<K, V> | null, key: K): AVLNode<K, V> | null {
        if (!node) {
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
        if (node) {
            node.value = value;
        }
    }

    // 遍历二叉树 - 中序遍历
    inOrderTraversal(callback: (key: K, value: V) => void): void {
        this._inOrderTraversal(this.root, callback);
    }

    private _inOrderTraversal(node: AVLNode<K, V> | null, callback: (key: K, value: V) => void): void {
        if (node !== null) {
            this._inOrderTraversal(node.left, callback);
            callback(node.key, node.value);
            this._inOrderTraversal(node.right, callback);
        }
    }

    // 找到最小节点
    private _findMin(node: AVLNode<K, V>): AVLNode<K, V> {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}

// 示例用法
const avlTree = new AVLTree<number, string>();

avlTree.insert(5, 'Five');
avlTree.insert(3, 'Three');
avlTree.insert(7, 'Seven');
avlTree.insert(2, 'Two');
avlTree.insert(4, 'Four');

console.log('In-Order Traversal:');
avlTree.inOrderTraversal((key, value) => console.log(key, value));

console.log('\nAfter deleting node with key 3:');
avlTree.delete(3);
avlTree.inOrderTraversal((key, value) => console.log(key, value));

console.log('\nAfter updating node with key 4:');
avlTree.update(4, 'New Four');
avlTree.inOrderTraversal((key, value) => console.log(key, value));
