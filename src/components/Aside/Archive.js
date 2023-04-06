import { useEffect, useState } from "react"
import useFetch from "../useFetch"
import createDatesDisplay from "./formatDates";
import uniqid from 'uniqid';

export default function Archive() {

    const { data, loading } = useFetch({api: 'https://fs-blog-backend.fly.dev/blog', method: 'GET'})
    const [dates, setDates] = useState(null);

    const [expandedYear, setExpandedYear] = useState(null);
    const [expandedMonth, setExpandedMonth] = useState(null);
    const [expandedDay, setExpandedDay] = useState(null);

    useEffect(() => {
        if(loading === true) return;
        setDates(createDatesDisplay(data));
    }, [loading])

  return (
    <div className="archive">
      {dates && Object.keys(dates).map((year) => (
        <div key={year}>
          <div onClick={expandedYear ? () => setExpandedYear(null) : () => setExpandedYear(year)}>
            {year} {expandedYear === year ? "▲" : "▼"}
          </div>
          {expandedYear === year && (
            <>
              {Object.keys(dates[year]).map((month) => (
                <div key={`${year}-${month}`}>
                  <div onClick={expandedMonth ? () => setExpandedMonth(null) : () => setExpandedMonth(month)}>
                    {month} {expandedMonth === month ? "▲" : "▼"}
                  </div>
                  {expandedMonth === month && (
                    <>
                      {Object.keys(dates[year][month]).map((day) => (
                        <div key={uniqid()}>
                          <div onClick={expandedDay ? () => setExpandedDay(null) : () => setExpandedDay(day)}>
                            {day} {expandedDay === day ? "▲" : "▼"}
                          </div>
                          {expandedDay === day && (
                            <ul>
                              {dates[year][month][day].map((post) => (
                                <li key={uniqid()}>{post}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}