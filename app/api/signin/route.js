export  function GET(req){
    return new Response("{content:re}",{headers: {"Content-Type": "application/json" }})
 }


 export function POST(req){
   return new Response(JSON.stringify(req.body),{headers: {"Content-Type": "application/json" }})
 }