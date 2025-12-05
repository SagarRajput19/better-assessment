import pytest
from app import create_app
from models import db, Task

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

def test_create_and_get_task(client):
    res = client.post("/api/tasks", json={"title": "Test Task"})
    assert res.status_code == 200
    data = res.get_json()
    assert data["task"]["title"] == "Test Task"

    res2 = client.get("/api/tasks")
    assert res2.status_code == 200
    arr = res2.get_json()
    assert isinstance(arr, list)
    assert arr[0]["title"] == "Test Task"
