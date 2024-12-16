export default function createDatesDisplay(posts) {
    const obj = {};
    posts.map(post => {
        const title = post.title;
        // split words in date into separate strings
        const words = post.date_formatted.split(' ');
        const month = words[0];
        // Day is 'day, ', so we split to get the number, and convert to string
        const day = words[1].split(',')[0].toString();
        const year = words[2];

        if (!(year in obj)) {
            obj[year] = {};
        }
        if (!(month in obj[year])) {
          obj[year][month] = {};
        }
        if(!(day in obj[year][month])) {
            obj[year][month][day] = [];
        }
        
        obj[year][month][day].push(title);
        return obj;
    })
    return obj;
}