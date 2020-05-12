import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import {Link} from 'react-router-dom';

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);

  useEffect( () => {
    async function loadData() {
    	var rawResponse = await fetch('https://newsapi.org/v2/sources?country=fr&apiKey=0ca7326d3aba4440b2b5f5a7b1695452');
    	var response = await rawResponse.json();
    	setSourceList(response.sources);
    }
    loadData()
  }, []);
  //console.log(sourceList);

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

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
