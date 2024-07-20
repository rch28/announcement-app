const API_URL_BASE = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/announcement`;

async function fetchAllComments(url) {
  let comments = [];
  while (url) {
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    comments = comments.concat(data.results);
    url = data.next;
  }
  return comments;
}

// function buildCommentHierarchy(comments) {
//   const commentDict = comments.reduce((acc, comment) => {
//     acc[comment.id] = comment;
//     comment.children = [];
//     return acc;
//   }, {});

//   const topLevelComments = [];

//   comments.forEach((comment) => {
//     if (comment.parent) {
//       const parentComment = commentDict[comment.parent];
//       if (parentComment) {
//         parentComment.children.push(comment);
//       }
//     } else {
//       topLevelComments.push(comment);
//     }
//   });

//   return topLevelComments;
// }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ann_id = searchParams.get("ann_id");
  const limit= searchParams.get("limit")
  const API_URL = `${API_URL_BASE}/${ann_id}/comment/list/?limit=${limit}`;
  console.log(limit);
  try {
    const response = await fetch(API_URL, { cache: 'no-store', headers: { 'Authorization': `${req.headers.get('Authorization')}` } });
    const comments = await response.json();
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch comments" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
