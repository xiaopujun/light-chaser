export default class DateUtil {
    public static format(date: Date): string {
        const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // 使用24小时制
        });

        const formattedDateTime = dateFormatter.format(date);
        // 替换默认的日期时间分隔符和时间部分的格式
        return formattedDateTime.replace(',', '').replace(/\//g, '-');
    }
}