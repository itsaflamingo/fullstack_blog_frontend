import { useEffect, useState } from "react"
import useFetch from "../useFetch"
import createDatesDisplay from "./formatDates";
import uniqid from 'uniqid';
import { useNavigate } from "react-router-dom";

export default function Archive() {

    // Get all published blog posts
    const { data, loading } = useFetch({api: 'https://fs-blog-backend.fly.dev/blog', method: 'GET'})
    // Set up state to extract dates from blog posts
    const [dates, setDates] = useState(null);
    // Set state to toggle dropdown
    const [expandedYear, setExpandedYear] = useState(null);
    const [expandedMonth, setExpandedMonth] = useState(null);
    const [expandedDay, setExpandedDay] = useState(null);

    const nav = useNavigate();
    
    useEffect(() => {
        // If data is loaded, send to createDatesDisplay, which returns object with nested date object
        if(loading === true) return;
        setDates(createDatesDisplay(data));
    }, [loading])

    // Triggers when blog post name is clicked from archive
    const goToBlogPost = title => {
        // Find clicked blog post
        const postArr = data.filter(blogPost => blogPost.title === title)
        const post = postArr[0];
        // navigate to clicked blog post in separate route
        nav(`/post/${post._id}`, { state: post });
    }

  return (
    <div className="archive-container">
        <h3>Archive</h3>
      {dates && Object.keys(dates).map((year) => (
        <div className='archive'key={year}>
          <div className="clickable" onClick={expandedYear ? () => setExpandedYear(null) : () => setExpandedYear(year)}>
            {year} {expandedYear === year ? "▲" : "▼"}
          </div>
          {expandedYear === year && (
            <>
              {Object.keys(dates[year]).map((month) => (
                <div key={`${year}-${month}`}>
                  <div className="clickable" onClick={expandedMonth ? () => setExpandedMonth(null) : () => setExpandedMonth(month)}>
                    {month} {expandedMonth === month ? "▲" : "▼"}
                  </div>
                  {expandedMonth === month && (
                    <>
                      {Object.keys(dates[year][month]).map((day) => (
                        <div key={uniqid()}>
                          <div className="clickable" onClick={expandedDay ? () => setExpandedDay(null) : () => setExpandedDay(day)}>
                            {day} {expandedDay === day ? "▲" : "▼"}
                          </div>
                          {expandedDay === day && (
                            <div>
                              {dates[year][month][day].map((post) => (
                                <div key={uniqid()}
                                onClick={() => goToBlogPost(post)}>{post}</div>
                              ))}
                            </div>
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