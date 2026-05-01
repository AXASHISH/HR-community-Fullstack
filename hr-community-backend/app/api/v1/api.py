from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, nominations, categories, voting, events, agenda, members

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(nominations.router, prefix="/nominations", tags=["Nominations"])
api_router.include_router(nominations.router, tags=["Nominations Legacy"])
api_router.include_router(categories.router, prefix="/categories", tags=["Categories"])
api_router.include_router(categories.router, prefix="/nomination-categories", tags=["Categories Legacy"])
api_router.include_router(voting.router, prefix="/voting", tags=["Voting"])
api_router.include_router(events.router, prefix="/events", tags=["Events"])
api_router.include_router(agenda.router, prefix="/agenda", tags=["Agenda/Speakers"])
api_router.include_router(members.router, prefix="/members", tags=["Community Members"])
