import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import { type } from '@testing-library/user-event/dist/type';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles,setArticles] = useState([])
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResults] = useState(0)

        // document.title=`${this.capitalizeFirstLetter(props.category)} - News Monkey`;
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
    const updateNews= async() =>{
      props.setProgress(0);
      const url =`https://newsapi.org/v2/top-headlines/?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
      setLoading(true);
      let data = await fetch(url);
      // props.setProgress(45);
      let parsedData = await data.json();
      // props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }

  

    useEffect(()=>{
      updateNews();
    },[])

    // handleNextClick =async () => {
    //   this.setState({page: this.state.page+1})
    //   this.updateNews();
    // }

    // handlePrevClick = async () =>{
    //   this.setState({page: this.state.page-1})
    //   this.updateNews();
    // }
    const fetchMoreData = async() => {
      setLoading(true)
      const url =`https://newsapi.org/v2/top-headlines/?country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}&category=${props.category}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }

    return (
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
        >
      <div className="container my-3">
      <h1 className="text-center" style={{margin: "40px"}}>Top {props.type} Headlines</h1>
      {loading && <Spinner />}
      
        <div className="container">
        <div className="row">
            {articles.map((element)=>{ 
                return <div key={element.url} className="col-md-4 col-sm-6">
            <NewsItem  newsUrl={element.url} title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt}/>
            </div>})}
        </div>
        </div>
        
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1?true:false} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil((this.state.totatArticles)/props.pageSize)?true:false} type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
      </InfiniteScroll>
    )

}

export default News

News.defaultProps ={
  country: "in",
  pageSize: 5,
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  page: PropTypes.number,
  category: PropTypes.string
}





