import React from 'react';
import './App.css';
import { Card, Icon} from 'antd';
import Nav from './Nav';

import {connect} from 'react-redux';
import articles from './reducers/articles';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const whishList = props.articleWishListToDisplay;
  //console.log(whishList);

  var articleList = whishList.map(function(article, i) {
    return <div  style={{display:'flex',justifyContent:'center'}}>
      <Card
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
            <Icon type="read" key="ellipsis2" />,
            <Icon type="delete" key="ellipsis" onClick={ ()=>{props.deleteToWishList(article.title)} } />
          ]}
        >
        <Meta
          title={article.title}
          description={article.description}
        />
      </Card>
    </div>
  });

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
                
                {
                  whishList.length == 0 ? 'No articles !' : articleList   
                }

            </div>

    </div>
  );
}

function mapStateToProps(state){
  return { 
    articleWishListToDisplay: state.articleWhishList,
  }
}
function mapDispatchToProps(dispatch){
  return { 
    deleteToWishList: function(title){
      dispatch( {type: 'deleteAticle', actionArticleTitle: title} );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);
