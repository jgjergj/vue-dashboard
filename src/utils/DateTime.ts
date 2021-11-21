import { format, parseISO } from 'date-fns';

class DateTime {
    public formatDate(date) {
        if(typeof date === "string"){
            date = parseISO(date)
        }
        return format(date, 'yyyy-MM-dd');
    }
}

const dateTime = new DateTime();

export default dateTime;