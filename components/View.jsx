import React from 'react';

const View = ({ posts }) => {
  console.log(posts[1]
    );

  return (
    <div>
      <section className="home-cards">
        {posts &&
          posts.map((post) => (
            <div className='each-post'>
                <img className='all-one-img' src= {post.featuredImage.url}/>
                <h3 className='all-one-heading'>{post.author.name}</h3>
            </div>

              
          ))}
        <div>
            <img src="https://i.ibb.co/LZPVKq9/card1.png" alt=""/>
            <h3>New Surface Pro 7</h3>
            <p>
            See how Katie Sowers, Asst. Coach for the 49ers, uses Surface Pro 7
                            to put her plans into play.
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
        </div>
      </section>
    </div>
  );
};

export default View;