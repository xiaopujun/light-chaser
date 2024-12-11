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
    //队列是否已经出现循环
    private circulate: boolean = false;
    //回退次数
    private backCount: number = 0;

    constructor(capacity: number = 10) {
        this.capacity = capacity;
        this.elements = new Array(capacity);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
        this.back = this.rear;
        this.backAll = false;
    }

    /**
     * 入队
     * @param item
     */
    enqueue(item: T): void {
        // 队列已满，移动 front 指针来丢弃最早的元素, 如果插入前backAll为true，说明已经回退过所有元素，此时不需要移动front指针
        if (this.size === this.capacity && !this.backAll) {
            this.circulate = true;
            this.front = (this.front + 1) % this.capacity;
        }
        //是否执行过回退操作？
        if (this.back !== this.rear) {
            this.rear = (this.back + 1) % this.capacity;
            this.elements[this.rear] = item;
            this.size -= this.backCount;
            this.backCount = 0;
        } else {
            this.rear = (this.rear + 1) % this.capacity;
            this.elements[this.rear] = item;
        }
        if (this.size < this.capacity)
            this.size++;
        this.back = this.rear;
        this.backAll = false;
        // console.log('插入', this.elements, 'front', this.front, 'rear', this.rear, 'back', this.back, 'backAll', this.backAll, 'size', this.size)
    }

    /**
     * 获取队首元素
     */
    getFront(): T | null {
        if (this.size === 0)
            return null;
        return this.elements[this.front];
    }

    /**
     * 获取队尾元素
     */
    getRear(): T | null {
        if (this.size === 0)
            return null;
        return this.elements[this.rear];
    }


    /**
     * 回退
     */
    backoff(): T | null {
        if (this.size === 0)
            return null;
        //如果已经退回到最后一个元素（退无可退了）则直接返回队首元素
        if (this.backAll) {
            // console.log('回退到底了', this.elements, 'front', this.front, 'rear', this.rear, 'back', this.back, 'backAll', this.backAll)
            return null;
        }
        if (this.back === this.front)
            this.backAll = true;
        //先取出当前退回指针所指向的元素，然后将退回指针前移一位
        const elem = this.elements[this.back];
        this.back = (this.back - 1 + this.capacity) % this.capacity;
        this.backCount++;
        // console.log('回退', elem, 'front', this.front, 'rear', this.rear, 'back', this.back, 'size', this.size, 'backAll', this.backAll)
        return elem;
    }

    /**
     * 前进
     */
    forward(): T | null {
        if (this.size === 0)
            return null;
        if (this.back === this.rear) {
            // console.log('已经前进到最后一个元素', this.elements, 'front', this.front, 'rear', this.rear, 'back', this.back, 'size', this.size)
            return null;
        }
        this.back = (this.back + 1) % this.capacity;
        // console.log('前进', this.elements[this.back], 'front', this.front, 'rear', this.rear, 'back', this.back, 'size', this.size)
        if (this.backAll)
            this.backAll = false;
        return this.elements[this.back];
    }

    /**
     * 获取当前退回指针所指向的元素
     */
    getBackPointElem(): T | null {
        return this.elements[this.back];
    }

    /**
     * 是否为空
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * 是否已满
     */
    isFull(): boolean {
        return this.size === this.capacity;
    }

    /**
     * 获取当前队列元素个数
     */
    getSize(): number {
        return this.size;
    }

    getBack(): number {
        return this.back;
    }

    getCirculate(): boolean {
        return this.circulate;
    }
}
