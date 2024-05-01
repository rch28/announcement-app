
export async function POST(req){

    const data= await req.json()
    console.log(data);

    return Response.json({msg:"success"})
}