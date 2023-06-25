'use client'

import View from "../../components/View"
import { useState,useEffect } from "react";
import {GraphQLClient} from 'graphql-request'
import '../../components/ViewOne.css'
import Loading from "../../components/Loading";

const page = () => {
    const hygraph = new GraphQLClient(
    'https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master');
    
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
      const fetchData = async()=>{
        try{
        const response = await hygraph.request(
          `
          {
            posts {
              comments {
                author {
                  username
                  photo {
                    url
                  }
                }
                comment
              }
              author {
                ... on Author {
                  username
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
              id
            }
          }
          `)
        setPosts(response.posts)

        console.log(posts,response.posts)
        }
        catch(error){
          console.log(error)
        }
      }
      fetchData();
    },[])
  return (
  <div>
    {posts.length?<View posts={posts}/>:<Loading/>}
    
  </div>
)
}

export default page
