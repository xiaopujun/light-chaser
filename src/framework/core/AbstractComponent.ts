abstract class AbstractComponent<P> {

    protected instance: any = null;

    public abstract create(container: HTMLElement, props?: P): Promise<AbstractComponent<P> | null>;

    public abstract changeData(data: any): void;

    public abstract update(data: any): void;

    public abstract destroy(): void;

    public abstract getData(): void;
}

export default AbstractComponent;
