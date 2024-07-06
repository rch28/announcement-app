import Cookies from "js-cookie";

export function GetAccessToken() {
  return Cookies.get("access_token");
}
export function GetTheme(){
  return Cookies.get("theme");
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
// Fetch group data from the API
export async function fetchGroup(id) {
  const access_token = GetAccessToken();
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/group/retrieve/${id}/
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
export const fetchAllData = async (url) => {
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
      const restData = await fetchAllData(result.next)
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



// fetch all comments
export const fetchComments = async (ann_id, limit) => {
  const response = await fetch(`/api/comments?ann_id=${ann_id}&&limit=${limit}`,{ cache: 'no-store', headers: { 'Authorization': `Bearer ${GetAccessToken()}` }});
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};