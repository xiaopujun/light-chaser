export default class HistoryQueue<T> {
    //容量
    private readonly capacity: number;
    //元素数组
    private readonly elements: T[];
    //队首指针
    private front: number;
    //队尾指针
    private rear: number;
    //队列大小
    private size: number;
    //回退指针
    private back: number;
    //是否已经回退所有
    private backAll: boolean;

    constructor(capacity: number = 10) {
        this.capacity = capacity;
        this.elements = new Array(capacity);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
        this.back = this.rear;
        this.backAll = false;
    }

    //入队
    enqueue(item: T): void {
        // 队列已满，移动 front 指针来丢弃最早的元素
        if (this.size === this.capacity)
            this.front = (this.front + 1) % this.capacity;
        //是否执行过回退操作？
        if (this.back !== this.rear) {
            this.rear = (this.back + 1) % this.capacity;
            this.elements[this.rear] = item;
        } else {
            this.rear = (this.rear + 1) % this.capacity;
            this.elements[this.rear] = item;
        }
        if (this.size < this.capacity)
            this.size++;
        this.back = this.rear;
        this.backAll = false;
    }

    //回退
    backoff(): T | null {
        if (this.size === 0)
            return null;
        //如果已经退回到最后一个元素（退无可退了）则直接返回队首元素
        if (this.backAll)
            return this.elements[this.front];
        let tempBack = (this.back - 1 + this.capacity) % this.capacity;
        if (tempBack === this.front)
            this.backAll = true;
        this.back = tempBack;
        return this.elements[this.back];
    }

    //前进
    forward(): T | null {
        if (this.size === 0)
            return null;
        if (this.back === this.rear)
            return this.elements[this.rear];
        this.back = (this.back + 1) % this.capacity;
        return this.elements[this.back];
    }

    //是否为空
    isEmpty(): boolean {
        return this.size === 0;
    }

    //是否已满
    isFull(): boolean {
        return this.size === this.capacity;
    }

    //获取当前队列元素个数
    getSize(): number {
        return this.size;
    }
}
