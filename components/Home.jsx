'use client'

import './Home-style.css'
import hygraph from '@/utils/GraphQLConnection'
import Loading from './Loading'
import { useState, useEffect } from 'react'
import View from './View'

const Home = () => {
    const [recentPosts,setRecentPosts] = useState([])
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
          setRecentPosts(response.posts)
          }
          catch(error){
            console.log(error)
          }
        }
        fetchData();
      },[])
    return (
        <div className='w-full'>
                <header className="showcase">
                    <h2 className='text-[#fff]'>Most liked post</h2>
                    <p className='text-[#f0f0f0]'>
                        A story of a alone boy
                    </p>
                    <a href="/viewblog/clq38j1660xub0bpl2diamv9w" className="btn">
                        Read Now <i className="fas fa-chevron-right"></i>
                    </a>
                </header>
                <h2 className='heading'>Recent Posts</h2><br/>
                {recentPosts.length?<View posts={recentPosts}/>:<Loading/>}
        </div>
    )
    }

    export default Home
