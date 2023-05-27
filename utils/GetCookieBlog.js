import Cookies from 'js-cookie';
import hygraph from './GraphQLConnection';
export default function validate(){
if (Cookies.get("blogappsession")){
    return true;
}
else{
    return false;
}
}