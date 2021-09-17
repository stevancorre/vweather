import moment from "moment"

declare global {
    interface Date {
        format(format: string): string;
    }
}

export const secondsToMs = (seconds: number) => seconds * 1e3;
export const minutesToMs = (minutes: number) => minutes * 6e4;
export const hoursToMs = (hours: number) => hours * 3.6e6;

Date.prototype.format = (format: string) => {
    return moment(this).format(format);
}