"use client"

import View from "../../components/View"
import { useState,useEffect } from "react";
import {GraphQLClient} from 'graphql-request'

const page = async () => {
    const hygraph = new GraphQLClient(
    'https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master');
    
    const [post,setPost] = useState([]);
    useEffect(()=>{
      hygraph.request(
        `
        {
          posts {
            comments {
              author {
                name
                photo {
                  url
                }
              }
              comment
            }
            author {
              ... on Author {
                name
                photo {
                  url
                }
              }
            }
            likes
            title
            featuredImage {
              url
            }
            content {
              text
            }
          }
        }
        `
      ).then((response)=>{setPost(response);console.log(post)})
      // .then(
      //   (data)=>setPost(console.log(data)))
    },[])
  return (
  <div>
    <View posts={post}/>
  </div>
)
}

export default page
