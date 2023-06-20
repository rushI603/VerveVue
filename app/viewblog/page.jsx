'use client'

import View from "../../components/View"
import { useState,useEffect } from "react";
import {GraphQLClient} from 'graphql-request'

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
    <View posts={posts}/>
  </div>
)
}

export default page
