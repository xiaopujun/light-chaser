abstract class AbstractConvert<P = any> {
    /**
     * 获取转换器唯一标识
     */
    abstract getKey(): string;

    /**
     * 正向转换
     * @param data
     */
    abstract convert(data: P): void;

    /**
     * 反向转换
     * @param data
     */
    abstract convertBack(data: P): Promise<void>
}

export default AbstractConvert;