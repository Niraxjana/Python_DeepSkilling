from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from typing import AsyncGenerator
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
#create_asyn_engine creates a connection engine
#asyncSession is like a temp conversation with the db
#sessionmaker creates a factory that can make sessions whenever needed.

#postgreSQL connection URL
DATABASE_URL = (
    "postgresql+asyncpg://postgres:postgres123@localhost:5432/course_db"
)
# Create one engine for the entire application
engine = create_async_engine(
    DATABASE_URL,
    echo=True
)

# Factory to create database sessions
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db():
    async with SessionLocal() as session: #sessionlocal is a session factory
        yield session #the fn pauses at yield after the endpoint finishes execution resumes after yield this allows cleanup