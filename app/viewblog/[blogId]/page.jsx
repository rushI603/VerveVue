import ViewOne from "../../../components/ViewOne"

const page = ({params}) => {
  return (
    <div>
      <ViewOne id = {params.blogId}/>
    </div>
  )
}

export default page
