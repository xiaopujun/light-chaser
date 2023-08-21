export default class HistoryQueue<T> {
    //容量
    private capacity: number;
    //元素数组
    elements: T[];
    //队首指针
    front: number;
    //队尾指针
    rear: number;
    //队列大小
    private size: number;
    //回退指针
    back: number;
    //是否已经回退所有
    backAll: boolean = false;

    constructor(capacity: number = 10) {
        this.capacity = capacity;
        this.elements = new Array(capacity);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
        this.back = this.rear;
    }

    enqueue(item: T): void {
        if (this.size === this.capacity) {
            // 队列已满，移动 front 指针来丢弃最早的元素
            this.front = (this.front + 1) % this.capacity;
        }
        //是否执行过回退操作？
        if (this.back !== this.rear) {
            this.rear = (this.back + 1) % this.capacity;
            this.elements[this.rear] = item;
        } else {
            this.rear = (this.rear + 1) % this.capacity;
            this.elements[this.rear] = item;
        }
        if (this.size < this.capacity) {
            this.size++;
        }
        this.back = this.rear;

        console.log("Queue elements:", this.elements, "front:", this.front, "rear:", this.rear, "back:", this.back);
    }

    //回退
    backoff(): T | null {
        if (this.size === 0) {
            return null;
        }
        let tempBack = (this.back - 1 + this.capacity) % this.capacity;
        if (tempBack === this.front) {
            this.backAll = true;
            const res = this.elements[this.front];
            console.log("backoff elements:", res, "front:", this.front, "rear:", this.rear, "back:", this.back);
            return res;
        } else {
            this.back = tempBack;
            const res = this.elements[this.back];
            console.log("backoff elements:", res, "front:", this.front, "rear:", this.rear, "back:", this.back);
            return res;
        }

    }


    isEmpty(): boolean {
        return this.size === 0;
    }

    isFull(): boolean {
        return this.size === this.capacity;
    }

    getSize(): number {
        return this.size;
    }
}
