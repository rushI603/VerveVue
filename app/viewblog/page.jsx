import View from "../../components/View"

const page = async () => {
  const hygraph = new GraphQLClient(
    'https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master');
  const {posts} = await hygraph.request(
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
  )
  //get all the posts from db
  return (
  <div>
    <View props={ar}/>
  </div>
)
}

export default page
