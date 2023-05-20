export  function GET(req){
    return new Response({name:"should validate the user"},{ "status": 200, headers: { "Content-Type": "application/json" } })
 }