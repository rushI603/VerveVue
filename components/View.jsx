import autoprefixer from 'autoprefixer';
import React from 'react';

const View = ({ posts }) => {
  console.log(posts[1]
    );

  return (
    <div>
      <section className="home-cards">
        {posts &&

          posts.map((post) => (
            <div className='each-post' style={{}} key={post.id}>
              
              <img className='all-one-img' style={{position:"relative"}} src= {post.featuredImage.url}/>
              <h3>{post.title}</h3>
              <a href={`/viewblog/${post.id}`}>Read More...</a>
            </div>
          ))}
        
      </section>
    </div>
  );
};

export default View;