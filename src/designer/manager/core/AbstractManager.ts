export default abstract class AbstractManager<D> {
    public abstract init(data: D, ...other: unknown[]): void;

    public abstract getData(): D;

    public abstract destroy(): void;
}