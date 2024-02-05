import pytest
from httpx import AsyncClient
from fastapi import FastAPI
from app.main import app 
from tests.controllers.mock_action_service import MockActionService
from app.dependencies import get_action_service

@pytest.fixture
def test_app_with_mocked_service():
    app.dependency_overrides[get_action_service] = lambda: MockActionService()
    return app

@pytest.mark.asyncio
async def test_get_action_id_by_codeword_success(test_app_with_mocked_service):
    async with AsyncClient(app=test_app_with_mocked_service, base_url="http://test") as ac:
        response = await ac.get("/actions/codeword/5001")
        assert response.status_code == 200
        assert response.json() == "alert"

@pytest.mark.asyncio
async def test_get_action_id_by_codeword_not_found(test_app_with_mocked_service):
    async with AsyncClient(app=test_app_with_mocked_service, base_url="http://test") as ac:
        response = await ac.get("/actions/codeword/9999")
        assert response.status_code == 404

@pytest.mark.asyncio
async def test_get_codewords_by_action_id_success(test_app_with_mocked_service):
    async with AsyncClient(app=test_app_with_mocked_service, base_url="http://test") as ac:
        response = await ac.get("/actions/id/alert")
        assert response.status_code == 200
        assert response.json() == [5001]

@pytest.mark.asyncio
async def test_get_codewords_by_action_id_no_content(test_app_with_mocked_service):
    async with AsyncClient(app=test_app_with_mocked_service, base_url="http://test") as ac:
        response = await ac.get("/actions/id/unknown")
        assert response.status_code == 204