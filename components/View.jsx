import React from 'react'
const View = (props) => {
    const ren = props["props"].map((item)=>
        <div>
            <img src={item.img} alt="post cover image" />
            <h3>{item.title}</h3>
            <p>{item.excerpt.slice(0,25)}...</p>
            <a href={item.slug}>Read more</a>
        </div>
    )
    return (
        <div>
            <section className="home-cards">
                {ren}
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
    )
}

export default View
