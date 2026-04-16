from flask import Blueprint, jsonify, request
from operacoesbd import *

task_route = Blueprint('task_route', __name__)

