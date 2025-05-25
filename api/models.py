from pydantic import BaseModel
from datetime import date

class BlogBase(BaseModel):
    title: str
    description: str
    body: str
    slug: str


class BlogCreate(BlogBase):
    pass

class Blog(BlogBase):
    id: int
    pub_date: date

    class Config:
        orm_mode = True