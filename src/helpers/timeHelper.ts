import moment from "moment"

declare global {
    interface Date {
        format(format: string): string;
    }
}

// ms helpers (more readable)
export const secondsToMs = (seconds: number) => seconds * 1e3;
export const minutesToMs = (minutes: number) => minutes * 6e4;
export const hoursToMs = (hours: number) => hours * 3.6e6;

// unix timestamp to actual date
export const unixToDate = (value: any) => {
    return new Date(Number.parseInt(value) * 1000);
}

// easier date formatting
Date.prototype.format = function (format: string) {
    return moment(this).format(format);
}
