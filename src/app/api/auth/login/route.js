// This fucntionality is not used for now
export async function  POST(req){

    const data=await req.json()
    const response = await fetch("http://127.0.0.1:8000/api/users/login/",{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
          },

    })
    console.log("response", response);

    if(response.ok){
        const data= response.json()
        console.log(data);
        return Response.json(data)
    }
    return Response.json(await response.json())
}