import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import {Link} from 'react-router-dom';

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);
  const [showStatus, setShowStatus] = useState('fr');

  var changeContry = (status)=>{
    if(status == 'fr'){
      setShowStatus('fr');
    } else if (status == 'gb') {
      setShowStatus('gb');
    }
  }

  useEffect( () => {
    async function loadData(country) {
        var rawResponse = await fetch(`https://newsapi.org/v2/sources?country=${country}&apiKey=0ca7326d3aba4440b2b5f5a7b1695452`);
        var response = await rawResponse.json();
        setSourceList(response.sources);
    }
    loadData(showStatus)
  }, []);
  console.log(showStatus);

  // useEffect( () => {
  //   async function loadData(status) {
  //     if(status == true){
  //       var rawResponse = await fetch('https://newsapi.org/v2/sources?country=fr&apiKey=0ca7326d3aba4440b2b5f5a7b1695452');
  //       var response = await rawResponse.json();
  //       setSourceList(response.sources);
  //     } else {
  //       var rawResponse = await fetch('https://newsapi.org/v2/sources?country=gb&apiKey=0ca7326d3aba4440b2b5f5a7b1695452');
  //       var response = await rawResponse.json();
  //       setSourceList(response.sources);
  //     }
  //   }
  //   loadData(showStatus)
  // }, []);
  // console.log(showStatus);


  return (
    <div>
        <Nav/>
       
       <div className="Banner" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img src='/images/france-flag-round-icon-32.png' onClick={ ()=>changeContry('fr') } style={ { cursor:'pointer' } }/>
          <img src='/images/united-kingdom-flag-round-xs.png' onClick={ ()=>changeContry('en') } width='32' style={ { cursor:'pointer' } }/>
       </div>

       <div className="HomeThemes">

          <List
              itemLayout="horizontal"
              dataSource={sourceList}
              renderItem={item => (
                <Link to={`/screen_articles_bySource/${item.id}`}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={item.description}
                    />
                  </List.Item>
                </Link>
              )}
          />
                
        </div>
                 
      </div>
  );
}

export default ScreenSource;
