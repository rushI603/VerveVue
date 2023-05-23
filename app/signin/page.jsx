import {GraphQLClient} from 'graphql-request'


const Login = async () => {
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
  console.log(posts)
  return (
    <div>
      <div class="login-box">
        <h2>Login</h2>
        <form>
            <div class="user-box">
            <input type="text" name="" required/>
            <label>Username</label>
            </div>
            <div class="user-box">
            <input type="password" name="" required/>
            <label>Password</label>
            </div>
            <a href="">
              Submit
            </a>
        </form>
        </div>
    </div>
  )
}

export default Login
