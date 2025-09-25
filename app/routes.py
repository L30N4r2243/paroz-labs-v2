from flask import Blueprint, jsonify

bp = Blueprint("main", __name__)

@bp.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "pong"})
