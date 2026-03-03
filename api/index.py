from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from pathlib import Path

# 添加父目录到路径
sys.path.insert(0, str(Path(__file__).parent.parent))

from core import (
    PoemGenerator,
    LoveGenerator,
    LoveTester,
    ChatHelper,
    MoreInteractions
)

app = Flask(__name__)
CORS(app)

# 初始化模块
poem_gen = PoemGenerator()
love_gen = LoveGenerator()
love_tester = LoveTester()
chat_helper = ChatHelper()
more_interactions = MoreInteractions()


@app.route('/')
def health_check():
    return jsonify({
        'status': 'ok',
        'service': 'sweet-lab-backend'
    })


@app.route('/poem', methods=['POST'])
def api_poem():
    data = request.json or request.form
    name = data.get('name', '')
    style = data.get('style', 'romantic')
    result = poem_gen.generate_acrostic(name, style)
    return jsonify(result)


@app.route('/love', methods=['POST'])
def api_love():
    data = request.json or request.form
    style = data.get('style', 'romantic')
    name = data.get('name', '')
    scene = data.get('scene', '')
    result = love_gen.generate(style, name, scene)
    return jsonify(result)


@app.route('/chat/earthy', methods=['GET'])
def api_chat_earthy():
    count = request.args.get('count', 3, type=int)
    result = chat_helper.generate_earthy_flirt(count)
    return jsonify(result)


@app.route('/chat/reply', methods=['POST'])
def api_chat_reply():
    data = request.json or request.form
    message = data.get('message', '')
    style = data.get('style', 'normal')
    result = chat_helper.generate_reply(message, style)
    return jsonify(result)


@app.route('/chat/starter', methods=['POST'])
def api_chat_starter():
    data = request.json or request.form
    scene = data.get('scene', 'first_chat')
    result = chat_helper.generate_topic_starter(scene)
    return jsonify(result)


@app.route('/test', methods=['POST'])
def api_test():
    data = request.json or request.form
    name1 = data.get('name1', '')
    name2 = data.get('name2', '')
    birthday1 = data.get('birthday1', '')
    birthday2 = data.get('birthday2', '')
    relationship_type = data.get('type', 'romantic')
    result = love_tester.test(name1, name2, birthday1, birthday2, relationship_type)
    return jsonify(result)


@app.route('/interact/couple-name', methods=['POST'])
def api_interact_couple_name():
    data = request.json or request.form
    name1 = data.get('name1', '')
    name2 = data.get('name2', '')
    result = more_interactions.generate_couple_name(name1, name2)
    return jsonify(result)


@app.route('/interact/nickname', methods=['POST'])
def api_interact_nickname():
    data = request.json or request.form
    name = data.get('name', '')
    result = more_interactions.generate_nickname(name)
    return jsonify(result)


@app.route('/interact/truth-or-dare', methods=['POST'])
def api_interact_truth_or_dare():
    data = request.json or request.form
    choice = data.get('choice', 'random')
    result = more_interactions.truth_or_dare(choice)
    return jsonify(result)


@app.route('/interact/lucky-draw', methods=['GET'])
def api_interact_lucky_draw():
    result = more_interactions.lucky_draw()
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
