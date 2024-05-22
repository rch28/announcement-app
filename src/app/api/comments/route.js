const API_URL_BASE = "http://127.0.0.1:8000/api/v1/announcement";

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

function buildCommentHierarchy(comments) {
  const commentDict = comments.reduce((acc, comment) => {
    acc[comment.id] = comment;
    comment.children = [];
    return acc;
  }, {});

  const topLevelComments = [];

  comments.forEach((comment) => {
    if (comment.parent) {
      const parentComment = commentDict[comment.parent];
      if (parentComment) {
        parentComment.children.push(comment);
      }
    } else {
      topLevelComments.push(comment);
    }
  });

  return topLevelComments;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ann_id = searchParams.get("ann_id");
  const API_URL = `${API_URL_BASE}/${ann_id}/comment/list/`;

  try {
    const comments = await fetchAllComments(API_URL);
    const commentHierarchy = buildCommentHierarchy(comments);
    return new Response(JSON.stringify(commentHierarchy), {
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
