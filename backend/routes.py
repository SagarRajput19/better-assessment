from flask import Blueprint, request, jsonify
from models import db, Task, Comment

api = Blueprint("api", __name__)

@api.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json() or {}
    title = data.get("title")
    if not title:
        return jsonify({"error": "title is required"}), 400
    task = Task(title=title, description=data.get("description", ""))
    db.session.add(task)
    db.session.commit()
    return jsonify({"message": "Task created", "task": task.to_dict()})

@api.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.order_by(Task.id.desc()).all()
    return jsonify([t.to_dict() for t in tasks])

@api.route("/tasks/<int:id>", methods=["GET"])
def get_task(id):
    t = Task.query.get_or_404(id)
    return jsonify(t.to_dict())

@api.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    data = request.get_json() or {}
    task = Task.query.get_or_404(id)
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    db.session.commit()
    return jsonify({"message": "Task updated", "task": task.to_dict()})

@api.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})

# Comments
@api.route("/tasks/<int:id>/comments", methods=["POST"])
def add_comment(id):
    data = request.get_json() or {}
    text = data.get("text")
    if not text:
        return jsonify({"error": "text is required"}), 400
    task = Task.query.get_or_404(id)
    comment = Comment(text=text, task_id=task.id)
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment added", "comment": comment.to_dict()})

@api.route("/tasks/<int:id>/comments", methods=["GET"])
def get_comments(id):
    Task.query.get_or_404(id)
    comments = Comment.query.filter_by(task_id=id).all()
    return jsonify([c.to_dict() for c in comments])

@api.route("/comments/<int:id>", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get_or_404(id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted"})
