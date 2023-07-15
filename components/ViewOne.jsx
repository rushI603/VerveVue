'use client'
import {GraphQLClient} from 'graphql-request'
import {useState, useEffect, useRef} from 'react'
import ContentEditable from "react-contenteditable"
import "./ViewOne.css"
import Loading from './Loading'
import validate from '@/utils/GetCookieBlog'
import { comment } from 'postcss'
const ViewOne = ({id}) => {
    const hygraph = new GraphQLClient(
    'https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master');
    
    const [post,setPost] = useState({});
    const [liked,setLiked] = useState(false);
    const [likes, setLikes] = useState();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([])
    const [session, setSession] = useState(false);
    const [empty,setEmpty] = useState(false)
    const [displayError, setDisplayError] = useState(false);


    async function publishComment(e){

      setDisplayError(!session);


      const timer = setTimeout(() => {
        setDisplayError(false);
      }, 2500);


      if(session){
        const comment=document.getElementById("newcomment").innerHTML
        document.getElementById("newcomment").innerHTML=""
        e.currentTarget.disabled = true;
        const userId=validate();
        const data = await hygraph.request(`
        query MyQuery {
          author(where: {id: "${userId}"}){
            username
          }
        }`)

        
        if(/\S/.test(comment)){
          setComments([{
            "author":
            {"username":data.author.username},
            comment:comment,
          }].concat(comments))
          e.target.disabled = false;
          const mutationData =
          await hygraph.request(
            `mutation MyMutation {
              createComment(
                data: {comment: "${comment}", post: {connect: {id: "${id}"}}, author: {connect: {id: "${userId}"}}}
              ) {
                id
              }
            }
            `
          )
          await hygraph.request(
            `mutation MyMutation {
              publishComment(where: {id: "${mutationData?.createComment?.id}"}, to: PUBLISHED) {
                id
              }
            }
            `
          )
          await hygraph.request(`
          mutation MyMutation {
            updatePost(data: {comments: {connect: {where: {id: "${mutationData?.createComment?.id}"}}}}, where: {id:"${id}"}) {
              id
            }
          }
          `)
          await hygraph.request(`
          mutation MyMutation {
            publishPost(where: {id: "${id}"}, to: PUBLISHED){
              id
            }
          }
          `)
          await hygraph.request(
            `mutation MyMutation {
              publishComment(where: {id: "${mutationData?.createComment?.id}"}, to: PUBLISHED) {
                id
              }
            }
            `
          )
          
        }
        else{
          setEmpty(true);
        }
      }
      
    }
    
    useEffect(()=>{
      setSession(validate())
      
      const fetchData = async()=>{
        try{
        const response = await hygraph.request(`
        query MyQuery {
          post(where: {id: "${id}"}) {
            id
            title
            likes
            featuredImage {
              url
            }
            comments {
              comment
              author {
                username
              }
            }
            content {
              html
            }
          }
        }`)
        setPost(response.post)
        setComments(response?.post?.comments)
        setLoading(false)
        setLikes(response.post?.likes)
        }
        catch(error){
          console.log(error)
        }
      }
      fetchData();
    },[])
    return loading ?
    <Loading/>
    :( post?(
    <div style={{"height":"100vh"}}>
      <img style={{"width":"100%","height":"40%","margin-bottom":"10px"}} src={post?.featuredImage?.url}/>
      <div style={{"display":"flex","justifyContent":"space-between"}}>
        <strong style={{"fontSize":"20px"}}>{post.title}</strong>
        {liked?
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            onClick={()=>setLiked(false)}
          >
            <path d="M4 21h1V8H4a2 2 0 00-2 2v9a2 2 0 002 2zM20 8h-7l1.122-3.368A2 2 0 0012.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 00-2-2z" />
          </svg>:
          <div>
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
              style={{display:"inline"}}
              onClick={()=>setLiked(true)}
              >
            <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" />
            </svg>
            
            <div style={{display:"inline", fontSize:"12px"}}> ({likes})</div>
        </div>
        
        }
      </div>
      <div
        style={{"padding-top":"10px"}}
        dangerouslySetInnerHTML={{__html: post.content?.html}}
      />
      <div style={{"paddingTop":"10px"}}>
        <div style={{"padding":"10px 0px","display":"flex","justifyContent":"space-between"}}>
          <div>
            <svg style={{"display":"inline",}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="0.75em" fill="currentColor" class="h-6 w-6 text-gray-6 dark:text-dark-gray-6">
              <path fill-rule="evenodd" d="M2 11.001a9.001 9.001 0 014.974-8.047A8.876 8.876 0 0110.998 2h.535c.018 0 .037 0 .055.002 3.934.218 7.204 3.02 8.15 6.753a1 1 0 01-1.94.49c-.734-2.9-3.27-5.065-6.294-5.245h-.51a6.876 6.876 0 00-3.12.74l-.004.002A7.001 7.001 0 004 11.003v.002a6.873 6.873 0 00.738 3.117c.206.407.271.871.185 1.32l-.387 2.022 2.022-.387c.448-.086.912-.021 1.32.185.44.222.9.395 1.373.518a1 1 0 11-.502 1.936 8.865 8.865 0 01-1.773-.669.067.067 0 00-.042-.006l-3.47.665a1 1 0 01-1.17-1.17l.665-3.47a.067.067 0 00-.006-.043A8.873 8.873 0 012 11.001zM17.004 20h-.005a3 3 0 01-2.68-1.658l-.004-.007A2.936 2.936 0 0114 17.004v-.206a2.995 2.995 0 012.773-2.797l.233-.001c.46-.001.917.107 1.33.315l.007.004A3 3 0 0120 17v.005c.001.425-.09.845-.268 1.232l-.133.29a1 1 0 00-.074.606l.093.485-.484-.093a1 1 0 00-.606.073l-.29.134a2.937 2.937 0 01-1.234.268zm-.296-8A4.995 4.995 0 0012 16.738v.262c-.002.777.18 1.543.53 2.237a5 5 0 006.542 2.313l2.303.441c.365.07.686-.25.616-.615l-.441-2.303a5 5 0 00-2.312-6.541A4.937 4.937 0 0017 12h-.292z" clip-rule="evenodd">
              </path>
            </svg>
            <strong style={{"fontSize":"15px"}}>Comments</strong> {empty&& <div style={{display:"inline",color:"red"}}>Comment is empty!</div>}
          </div>
          <div className="label-left-header">
            <span><strong>ctrl+B</strong></span>
            <span><em>ctrl + I</em></span>
            <span><u>ctrl + U</u></span>
          </div> 
        </div>
        <div style={{"position":"relative"}}>
          <div style={{"display":"flex","width":"100%","flexDirection":"column","borderRadius":"13px",}}>
           <div className='rich-text-editable-comment' 
            id = "newcomment"
            disabled={false}
            onClick={(e)=>setEmpty(false)} 
            contentEditable="true" style={{"marginBottom":"10px",paddingLeft:"15px"}}>
           </div>
           <div style={{"display":"flex","justifyContent":"flex-end"}}>
            <button type='submit' 
            onClick={(e)=>{publishComment(e)}}
            className='comment-submit'
            style={{background:"#32c48d",padding:"5px",borderRadius:"10px",width:"60px","marginBottom":"20px"}}
            >Publish</button>
           </div>
          </div>
        </div>
      </div>
      <div className='comments'>
        {
          comments.length?
        comments.map((comment)=><>
          <strong style={{"fontSize":"15px","color":"gray"}}>{comment?.author?.username}</strong>
          <p style={{"paddingLeft":"10px","fontSize":"13px","marginBottom":"10px"}}>{comment.comment}</p><br/>
        </>)
        :"No Comments Yet"
        }
      </div>
      {displayError && <div className='login-message' style={{width:"100px",position:'fixed',bottom:'10px',right:"10px",background:"gray",padding:"5px"}}>Please login</div>}
    </div>
    )
    :(<>No such Article</>
))
}
  //fetch the post from db with that id 

export default ViewOne
