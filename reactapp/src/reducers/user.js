export default function(token = '', action){
    if(action.type == 'userToken'){
        var newToken = action.actionUserToken;
        // console.log(newToken);
        return newToken;
    } else {
        return token;
    }
}
