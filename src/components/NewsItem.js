import React from 'react'

 const NewsItem = (props)=>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <>
        <div className='container my-3'>
          <div className="card">
            <img src={imageUrl ? imageUrl : "https://images.indianexpress.com/2022/12/Indian-express-logo-1-4.jpeg"} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description.slice(0, 88)}...</p>
              <p className="card-text">by {author ? author : "Unknown"} on {new Date(date).toGMTString()}</p>
              <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
          </div>
        </div>
      </>

    )
}

export default NewsItem
