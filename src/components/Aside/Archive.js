import { useEffect, useState } from "react"
import useFetch from "../useFetch"
import createDatesDisplay from "./formatDates";
import uniqid from 'uniqid';

export default function Archive() {

    const { data, loading } = useFetch({api: 'https://fs-blog-backend.fly.dev/blog', method: 'GET'})
    const [dates, setDates] = useState(null);

    useEffect(() => {
        if(loading === true) return;
        setDates(createDatesDisplay(data));
    }, [loading])

    return (
        <div className="archive">
            {dates && Object.keys(dates).map((year) => {
                return <div key={uniqid()}>
                <p>{year}</p>
                {Object.keys(dates[year]).map((month) => (
                  <div key={uniqid()}>
                    <p>{month}</p>
                      {Object.keys(dates[year][month]).map((day) => (
                        <div key={uniqid()}>{day}
                        {Object.values(dates[year][month][day]).map(blogPost => (
                            <div key={uniqid()}>
                                {blogPost}
                                </div>
                          ))}
                          </div>
                      ))}
                  </div>
                ))}
              </div>
          
            })}
        </div>
    )
}