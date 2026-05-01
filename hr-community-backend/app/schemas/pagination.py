from pydantic import BaseModel
from typing import Optional

class PaginationInfo(BaseModel):
    current_page: int
    per_page: int
    total_items: int
    total_pages: int
    has_next: bool
    has_prev: bool
    next_page: Optional[int]
    prev_page: Optional[int]
