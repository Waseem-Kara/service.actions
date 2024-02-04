from fastapi import APIRouter, HTTPException, Depends
from ..dependencies import get_action_service
from ..interfaces.action_service_interface import IActionService

router = APIRouter()

@router.get("/actions/codeword/{codeword}", response_model=str)
async def get_action_id_by_codeword(codeword: int, action_service: IActionService = Depends(get_action_service)):
    action_id = await action_service.get_action_id_by_codeword(codeword)
    if action_id is None:
        raise HTTPException(status_code=404, detail="Action not found")
    return action_id

@router.get("/actions/id/{action_id}", response_model=set)
async def get_codewords_by_action_id(action_id: str, action_service: IActionService = Depends(get_action_service)):
    codewords = await action_service.get_codewords_by_action_id(action_id)
    if not codewords:
        raise HTTPException(status_code=204, detail="No content")
    return codewords