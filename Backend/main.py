from fastapi import FastAPI
from sqlalchemy import select

from db import Post, Session

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/posts")
def posts():
    try:
        with Session() as session:
            stmt = select(Post)
            result = session.scalars(stmt).all()

            all_posts = [
                {
                    "id": post.id,
                    "author_name": post.author_name,
                    "image_url": post.image_url,
                    "caption": post.caption,
                    "like_count": post.like_count,
                    "created_at": post.created_at.isoformat() if post.created_at else None,
                }
                for post in result
            ]
            return all_posts
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}

@app.get("/posts/likes")
def postLikes():
    try:
        with Session() as session:
            stmt = select(Post)
            result = session.scalars(stmt).all()

            all_posts = [
                {
                    "id": post.id,
                    "like_count": post.like_count,
                }
                for post in result
            ]
            return all_posts
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}
    
@app.post("/posts/{post_id}/like")
def like_post(post_id: int):
    try:
        with Session() as session:
            post = session.get(Post, post_id)
            if post:
                post.like_count += 1
                session.commit()
                return {"message": f"Post {post_id} liked successfully!", "like_count": post.like_count}
            else:
                return {"error": f"Post with id {post_id} not found."}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}