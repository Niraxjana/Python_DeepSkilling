from fastapi import FastAPI, Depends
from schemas import CourseCreate, CourseUpdate
from typing import Optional
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession
from database import init_db, get_db
from models import Course
from sqlalchemy import select
from fastapi import status
@asynccontextmanager
async def lifespan(app):
    await init_db()
    yield

app = FastAPI(
    title="Course Management API",
    version="1.0",
    lifespan=lifespan
)

@app.get("/")
def home():
    return {
        "message": "API running"
    }
'''@app.post("/api/courses")
async def create_course(course: CourseCreate):
    return course'''


@app.post(
    "/api/courses",
    response_model=CourseResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_course(
    course: CourseCreate,
    db: AsyncSession = Depends(get_db)
):
    new_course = Course(
        name=course.name,
        code=course.code,
        credits=course.credits,
        department_id=course.department_id
    )

    db.add(new_course)
    await db.commit()
    await db.refresh(new_course)

    return new_course

#62. add a get endpoint
@app.get("/api/courses/{course_id}") #path parameter -> course id 
async def get_course(course_id: int):
    return {
        "course_id": course_id
    }

#query parameter
'''@app.get("/api/courses")
async def get_course(limit: int=10):
    return {"limit":limit}
@app.get("/api/courses")
async def get_course(skip: int=0, limit: int=10,
                     dep_id: Optional[int]=None):#none means it can be vomitted completely/int
    return{
        "skip":skip,
        "limit": limit,
        "dep_id": dep_id
    }'''


@app.get("/api/courses")
async def get_courses(
    skip: int = 0,
    limit: int = 10,
    dep_id: Optional[int] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Course)

    if dep_id:
        query = query.where(Course.dep_id == dep_id)

    query = query.offset(skip).limit(limit)

    result = await db.execute(query)

    return result.scalars().all()


@app.put("/api/courses/{course_id}")
async def update_course(
    course_id: int,
    course: CourseUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Course).where(Course.id == course_id)
    )

    db_course = result.scalar_one_or_none()

    if not db_course:
        return {"message": "Course not found"}

    for key, value in course.model_dump(exclude_unset=True).items():
        setattr(db_course, key, value)

    await db.commit()
    await db.refresh(db_course)

    return db_course



@app.delete("/api/courses/{course_id}")
async def delete_course(
    course_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Course).where(Course.id == course_id)
    )

    db_course = result.scalar_one_or_none()

    if not db_course:
        return {"message": "Course not found"}

    await db.delete(db_course)
    await db.commit()

    return {"message": "Course deleted"}