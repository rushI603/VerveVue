import React from 'react'
import "./ViewOne.css"
const ViewOne = ({id}) => {
    const post = {img:"https://media.graphassets.com/Fi2xKU5TRUCneNXTmKdB",
    author:{img:"https://media.graphassets.com/Fi2xKU5TRUCneNXTmKdB",name:""},title:"",
    content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."+
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}
    //fetch the post from db with that id 
  return (
    <div className='view-one'>
        <img src={post.img} alt='Govinda image'/>
        <div className="user-pannel">
          <div className="user-circle">
            <img src={post["author"]["img"]} alt="author image" />
          </div>
          <h1>Author name</h1>
        </div>
        <span>{post.content}</span>
    </div>
  )
}

export default ViewOne
