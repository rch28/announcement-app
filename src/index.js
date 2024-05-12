import Cookies from "js-cookie";

export function GetAccessToken() {
  return Cookies.get("access_token");
}

// Fetch logged in user data from the API
export async function getLoggedInUserData() {
  const access_token = GetAccessToken();
  try{
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/user/details/",
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (!response.ok) {
      console.log("something went wrong");
      return;
    }
    const result = await response.json();
    return result;

  }
  catch(error){
    return error;
  
  }
}

// Fetch user data from the API
export async function FetchUserData(id) {
  const access_token = GetAccessToken();
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/user/retrieve/${id}/
        `,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (!response.ok) {
      console.log("something went wrong");
      return;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}


// fetch the group data joined by the user
export const fetchJoinedGroup = async (url) => {
  const access_token = GetAccessToken();
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (!response.ok) {
      console.log("something went wrong!!");
      return;
    }
    const result = await response.json();
    if (result.next) {
      const restData = await fetchJoinedGroup(result.next)
      const allData = [...result.results, ...restData];
      return allData;
    }else{
      return result.results
    }
    
  } catch (error) {
    console.log("something went wrong");
    return []
  }
};