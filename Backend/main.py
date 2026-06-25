from contextlib import asynccontextmanager
from fastapi import FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import redis
import asyncio
import os
from sqlalchemy import select

from db import Post, Session

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

# Simple API key authentication (replace with real auth in production)
API_KEY = os.getenv("API_KEY", "default-insecure-key")

def putvaluesfromredis():
    """Synchronous function dealing with DB and Redis."""
    with Session() as session:
        # Grab all keys currently in Redis
        keys = list(r.scan_iter("*"))
        
        if not keys:
            return # Skip database transactions if there are no likes

        for key in keys:
            value = r.get(key)
            if value is not None:
                try:
                    post_id = int(key)
                except ValueError:
                    # Skip malformed keys
                    r.delete(key)
                    continue
                post = session.get(Post, post_id)
                if post:
                    print(f"Previsous like count for Post {key}: {post.like_count}")
                    post.like_count += int(value)
                    print(f"Post {key} liked successfully! New like count: {post.like_count}")
                
                # CRITICAL: Delete the key from Redis after processing
                # so we don't count these same likes again on the next loop!
                r.delete(key)
                
        session.commit()

async def check_redis():
    """Continuous background polling task."""
    while True:
        try:
            # Run the synchronous blocking function in a separate thread
            # so it doesn't freeze the FastAPI web server.
            await asyncio.to_thread(putvaluesfromredis)
                        
        except Exception as e:
            print(f"Error in Redis/DB polling: {e}")
            
        await asyncio.sleep(5)  # Check every 5 seconds

# --- Lifespan Event Manager ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup phase: Spin up the background task
    print("Starting background Redis poller...")
    polling_task = asyncio.create_task(check_redis())
    
    yield # Let FastAPI run and serve requests
    
    # Shutdown phase: Cancel the polling task gracefully
    print("Shutting down background Redis poller...")
    polling_task.cancel()

# Attach the lifespan to your FastAPI app
app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "https://example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows specific origins
    allow_credentials=True,         # Allows cookies/auth headers
    allow_methods=["*"],             # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],             # Allows all headers
)

# --- Your Endpoints Remain Unchanged ---

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
def like_post(post_id: int, x_api_key: str = Header(..., alias="X-API-Key")):
    # Simple API key check
    if x_api_key != API_KEY:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API Key")
    try:
        if r.exists(str(post_id)):
            r.incr(str(post_id))
        else:
            r.set(str(post_id), 1)
        return {"message": f"Post {post_id} liked successfully!"}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}