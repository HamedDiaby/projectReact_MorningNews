export default function(whishList=[], action){
    if(action.type == 'addLike'){
        var whishListCopy = [...whishList];
        whishListCopy.push(action.actionArticle);
        return whishListCopy;
    } else if(action.type == 'deleteAticle'){
        var whishListCopy = whishList.filter( (e)=>(e.title != action.actionArticleTitle));
        return whishListCopy;
    } else {
        return whishList;
    }
}
