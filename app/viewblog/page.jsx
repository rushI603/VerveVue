import View from "../../components/View"
const page = () => {
  const ar = [{img:"https://i.ibb.co/LZPVKq9/card1.png",title:"Govinda",slug:"#",excerpt:"This is just an text", content:"This is the actual content"},
              {img:"https://i.ibb.co/LZPVKq9/card1.png",title:"Govinda",slug:"#",excerpt:"This is just an text", content:"This is the actual content"},
              {img:"https://i.ibb.co/LZPVKq9/card1.png",title:"Govinda",slug:"#",excerpt:"This is just an text  This is the actual content This is the actual content This is the actual content This is the actual content This is the actual content This is the actual content This is the actual content", content:"This is the actual content"},
              {img:"https://i.ibb.co/LZPVKq9/card1.png",title:"Govinda",slug:"#",excerpt:"This is just an text", content:"This is the actual content"},
              {img:"https://i.ibb.co/LZPVKq9/card1.png",title:"Govinda",slug:"#",excerpt:"This is just an text", content:"This is the actual content"},
              {img:"https://i.ibb.co/LZPVKq9/card1.png",title:"Govinda",slug:"#",excerpt:"This is just an text", content:"This is the actual content"}


]
  //get all the posts from db
  return (
  <div>
    <View props={ar}/>
  </div>
)
}

export default page
