class SerializeUtil {

    public static serialize(obj: any): string {
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'function') {
                return value.toString();
            }
            return value;
        });
    }

    public static deserialize(str: string): any {
        return JSON.parse(str, (key, value) => {
            if (typeof value === 'string' &&
                value.indexOf('function') === 0) {
                const functionTemplate = `(${value})`;
                return eval(functionTemplate);
            }
            return value;
        });
    }
}

export default SerializeUtil;