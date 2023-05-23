import Image from 'next/image'
import Home from '../components/Home'
import View from '../components/View'
export default function Main() {
  // const ar = [{img:"https://i.ibb.co/LZPVKq9/card1.png",title:"Govinda",slug:"#",excerpt:"This is just an text", content:"This is the actual content"}]
  return (
    <main >
      {/* <View props={ar}/> */}
      <Home/>
    </main>
  )
}
