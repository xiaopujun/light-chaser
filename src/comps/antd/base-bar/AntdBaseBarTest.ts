import { Bar } from "@antv/g2plot";
import AbstractComponent from "../../../framework/core/AbstractComponent";

export default class AntdBaseBarTest extends AbstractComponent<any> {
  public create(
    container: HTMLElement,
    props?: any
  ): Promise<AbstractComponent<any> | null> {
    throw new Error("Method not implemented.");
  }
  private bar;

  constructor() {
    super();
    this.bar = new Bar("container", {
      data: [
        { year: "1951 年", value: 38 },
        { year: "1952 年", value: 52 },
        { year: "1956 年", value: 61 },
        { year: "1957 年", value: 145 },
        { year: "1958 年", value: 48 },
      ],
      xField: "value",
      yField: "year",
      seriesField: "year",
      legend: {
        position: "top-left",
      },
    });
  }

  public changeData(data: any): void {
    throw new Error("Method not implemented.");
  }
  public update(data: any): void {
    throw new Error("Method not implemented.");
  }
  public destory(): void {
    throw new Error("Method not implemented.");
  }
  public getData(): void {
    throw new Error("Method not implemented.");
  }
}
