export default class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    // 将元素推入栈顶
    push(element: T): void {
        this.items.push(element);
    }

    // 从栈顶弹出元素
    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }

    // 查看栈顶元素
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    // 检查栈是否为空
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // 获取栈的大小
    size(): number {
        return this.items.length;
    }

    // 清空栈
    clear(): void {
        this.items = [];
    }

    // 打印栈的元素
    print(): void {
        console.log(this.items.toString());
    }
}

// 示例用法
// const stack = new Stack<number>();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.print(); // 输出: "1,2,3"
// console.log("栈大小：" + stack.size()); // 输出: "栈大小：3"
// console.log("栈顶元素：" + stack.peek()); // 输出: "栈顶元素：3"
// stack.pop();
// stack.print(); // 输出: "1,2"
