from fastapi import FastAPI, HTTPException, APIRouter, Depends
from models import BlogCreate, Blog
from database import get_read_db_cursor, get_write_db_cursor, write_connection as write
from datetime import date
from security import get_api_key
import logging

router = APIRouter(prefix="/api")

@router.post("/blogs/create/", response_model=Blog)
async def create_blog(blog: BlogCreate, api_key: str = Depends(get_api_key)):
    cursor = get_write_db_cursor(dictionary=True)
    try:
        query = "INSERT INTO blogs (title, pub_date, description, body, slug) VALUES (%s, %s, %s, %s, %s)"
        values = (blog.title, date.today(), blog.description, blog.body, blog.slug)
        cursor.execute(query, values)
        write.commit()

        blog_id = 1 if cursor.lastrowid is None else cursor.lastrowid
        return {**blog.model_dump(), "id": blog_id, "pub_date": date.today()}
    
    except Exception as e:
        logging.error(f"Error creating blog: {e}")
        write.rollback()
        raise HTTPException(status_code=500, detail=e)    
    
    finally:
        cursor.close()


@router.get("/blogs/fetch_all_blogs", response_model = list[Blog])
async def fetch_all_blogs(api_key: str = Depends(get_api_key)):
    cursor = get_read_db_cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM blogs ORDER BY pub_date DESC")
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code = 404, detail = "No blogs found")
        return result
    
    finally:
        cursor.close()


@router.get("/blogs/fetch_blog/{blog_slug}", response_model = Blog)
async def fetch_blog(blog_slug: str, api_key: str = Depends(get_api_key)):
    cursor = get_read_db_cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM blogs WHERE slug = %s", (blog_slug,))
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code = 404, detail = "Blog not found")
        return result
    
    finally:
        cursor.close()


@router.put("/blogs/update/{blog_slug}", response_model = Blog)
async def update_blog(blog_slug: str, blog: BlogCreate, api_key: str = Depends(get_api_key)):
    cursor = get_write_db_cursor(dictionary=True)

    try:
        cursor.execute(
            "UPDATE blogs SET title = %s, description = %s, body = %s, slug = %s WHERE slug = %s",
            (blog.title, blog.description, blog.body, blog.slug, blog_slug)
        )
        write.commit()
        cursor.execute("SELECT * FROM blogs WHERE slug = %s", (blog.slug,))
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code=404, detail="Blog not found")
        return result

    finally:
        cursor.close()


@router.delete("/blogs/delete/{blog_slug}", response_model = Blog)
async def delete_blog(blog_slug: str, api_key: str = Depends(get_api_key)):
    cursor = get_write_db_cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM blogs WHERE slug = %s", (blog_slug,))
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code = 404, detail = "Blog not found")
        cursor.execute("DELETE FROM blogs WHERE id = %s", (blog_slug,))
        write.commit()
        return result
    
    finally:
        cursor.close()














