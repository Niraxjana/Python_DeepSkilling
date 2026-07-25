from pydantic import BaseModel #every schema in fastapi inherits from basemodel
from typing import Optional

class CourseCreate(BaseModel): #creating a blueprint for incoming data.
    name: str
    code: str #used for automatic validation
    credits: int
    dep_id: int

class CourseUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    credits: Optional[int] = None
    dep_id: Optional[int] = None
    #Pydantic automatically creates the constructor and validation for you.
'''Schemas define the expected request structure.
Pydantic validates incoming data automatically.
Some compatible types are converted (e.g., "4" → 4), while incompatible ones result in a 422 error.'''
