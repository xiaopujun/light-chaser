class Snowflake {
    private workerIdBits: number = 5;
    private datacenterIdBits: number = 5;
    private sequenceBits: number = 12;
    private maxWorkerId: number = -1 ^ (-1 << this.workerIdBits);
    private maxDatacenterId: number = -1 ^ (-1 << this.datacenterIdBits);
    private sequenceMask: number = -1 ^ (-1 << this.sequenceBits);
    private workerIdShift: number = this.sequenceBits;
    private datacenterIdShift: number = this.sequenceBits + this.workerIdBits;
    private timestampLeftShift: number = this.sequenceBits + this.workerIdBits + this.datacenterIdBits;
    private twepoch: number = 1288834974657;
    private lastTimestamp: number = -1;
    private sequence: number = 0;
    private workerId: number;
    private datacenterId: number;

    constructor(workerId: number, datacenterId: number) {
        this.workerId = workerId || 0;
        this.datacenterId = datacenterId || 0;
    }

    public generateId(): number {
        let timestamp = Date.now();

        if (timestamp < this.lastTimestamp) {
            throw new Error('Invalid system clock');
        }

        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1) & this.sequenceMask;
            if (this.sequence === 0) {
                timestamp = this.waitNextMillis(timestamp);
            }
        } else {
            this.sequence = 0;
        }

        this.lastTimestamp = timestamp;

        let id: number =
            ((timestamp - this.twepoch) << this.timestampLeftShift) |
            (this.datacenterId << this.datacenterIdShift) |
            (this.workerId << this.workerIdShift) |
            this.sequence;
        if (id < 0) id *= -1;
        return id;
    }

    private waitNextMillis(timestamp: number): number {
        while (timestamp <= this.lastTimestamp) {
            timestamp = Date.now();
        }
        return timestamp;
    }
}

const snowflake = new Snowflake(1, 1);

export default Snowflake;
export {snowflake}

