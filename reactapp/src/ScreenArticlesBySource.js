import React, {useEffect, useState} from 'react';
import './App.css';
import { Card, Icon, Modal, Button} from 'antd';
import Nav from './Nav'

import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  var id = props.match.params.id;

  useEffect( () => {
    async function loadData() {
    	var rawResponse = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=0ca7326d3aba4440b2b5f5a7b1695452`);
    	var response = await rawResponse.json();
    	setArticleList(response.articles);
    }
    loadData()
  }, []);
  //console.log(articleList);

  var showModal = (title, content) => {
    setTitle(title);
    setContent(content);
    setVisible(true);
  };
  
  var handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  var articles = articleList.map(function(article, i){
    return <Card
      key = {i}
      style={{ 
        width: 300, 
        margin:'15px', 
        display:'flex',
        flexDirection: 'column',
        justifyContent:'space-between' }}
        cover={
      <img
          alt="example"
          src={article.urlToImage}
      />
      }
      actions={[
          <Icon type="read" key="ellipsis2" onClick={ ()=>showModal(article.title, article.content) }/>,
          <Icon type="like" key="ellipsis" onClick={ ()=>{props.addArticle(article)} }/>
      ]}
      >

      <Meta
        title={article.title}
        description={article.description}
      />
      <Modal
          title={title}
          visible={visible}
          onCancel={()=>handleCancel()}
      >
          <p>{content}</p>
      </Modal>
        {/* {console.log(i, article.content)} */}
    </Card>;
  
  });

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
            {articles}
              <div  style={{display:'flex',justifyContent:'center'}}>

                              
              </div>

           </div> 

      
      </div>
  );
}

function addToWishList(dispatch){
  return {
    addArticle: function(article) {
      dispatch( {type: 'addLike', actionArticle: article} );
    }
  }
}

export default connect(
  null,
  addToWishList
)(ScreenArticlesBySource);
