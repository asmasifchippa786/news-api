import "./App.css";
import { useState, useEffect } from "react";

import axios from "axios";
import moment from "moment";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weaData, setWeaData] = useState([]);

  useEffect(() => {

    
        
    function getTrendingNews() {

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(suc , err)

      }else{
        console.log('your browser not support')
      }
      function suc(position){
        console.log(position.coords.latitude, position.coords.longitude)
        axios.request(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f19b2fe9326d65429d44f47d77af6bab`).then(function (response) {
        console.log(response.data);
        setWeaData(response.data)
      }).catch(function (error) {

      });
      }
      function err(error){
        console.log(error)
      }
    

      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '488e661873mshec49695cd0e737dp1e5bb4jsnbc21976ef37e',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };
      setIsLoading(true);
      axios.request(options).then(function (response) {
        setIsLoading(false);
        console.log(response.data);
        setData(response.data.value);
      }).catch(function (error) {
        setIsLoading(false);
        console.error(error);
      });
    }

    getTrendingNews();

  }, [])

  const icon = weaData.weather[0].icon

  const getNews = (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: query,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "488e661873mshec49695cd0e737dp1e5bb4jsnbc21976ef37e",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };
    setIsLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false);
        console.log(response.data.value);
        setData(response.data.value);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="App">
      <div className="mainHeader">
        <div className="nav1 navbar-fixed-top" >
          <div className="logoName">
            <h1>News App</h1>
          </div>
          <div className="serach">
            <form onSubmit={getNews}>
              <input
                type="text"
                placeholder="Enter your topic name"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="inputSearch"
              />
              <button type="submit" className="searchbtn">
                Get News
              </button>
            </form>
          </div>
          <div className="icons">
            <i className="bi bi-moon"></i>
          </div>
        </div>
      </div>
      {/* <div className="imokp">
        <div className="img"></div>
        <div className="text">News App</div>
      </div> */}
      {isLoading ? (
            <div className="loader">
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif" alt="" />
            </div>
          ) : (
            
          
      <div className="body">
        {/* <div className="left"></div> */}
        <div className="center">
      
          {data.map((eachPost) => (
            <div className="post">
              <div className="header">
                <div className="profile">
                  <div className="img">
                    <img
                      src={eachPost?.provider[0]?.image?.thumbnail?.contentUrl}
                      alt=""
                    />
                  </div>
                  <div className="text1 opilu">{eachPost?.provider[0]?.name}</div>
                </div>
                <div className="dateBox">
                  <div className="date">
                    {moment(eachPost?.datePublished).format("Do MMMM, h:mm a")}
                  </div>
                </div>
              </div>


              <div className="mainBodyPost">
                <div className="desc-img">
                  <div className="desc">
                  <div className="text1"><a target='_blank' rel="noreferrer" href={eachPost?.url}>{eachPost?.name}</a></div>
                  <div className="tret">{eachPost?.description}</div>
                  </div>
                    {" "}
                    <img
                      src={eachPost?.image?.thumbnail?.contentUrl
                        .replace("&pid=News", "")
                        .replace("pid=News&", "")
                        .replace("pid=News", "")}
                      alt=""
                      className="img"
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="right">
          <div className="wrapper">
          <div className="header">
            <div className="icon">
                <img src={`http://openweathermap.org/img/w/${icon}.png`}/>
            </div>
            <div className="heading">
                  {weaData.weather[0].description}
            </div>
            </div>
            <div className="details">
            <div className="type">
                <div className="humi">

                </div>
                <div className="max">

                </div>
                <div className="min">

                </div>
                </div>
                <div className="wind">
                        <div className="speed">

                        </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
