import Cookies from 'js-cookie';
import hygraph from './GraphQLConnection';
export default function validate(){
if (Cookies.get("blogappsession")?.length){
    return Cookies.get("blogappsession");
}
else{
    return false;
}
}