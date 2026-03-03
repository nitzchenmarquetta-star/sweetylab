// 甜蜜实验室 - Vercel 部署专用版本

const poemStyles = {
    romantic: { name: '浪漫古风', templates: ['{name1}风吹过小桥边，{name2}月照佳人影自怜。\n{name3}花开有意随流水，{name4}春色无边醉眼前。'] },
    cute: { name: '可爱卖萌', templates: ['{name1}是一只小可爱，{name2}蹦蹦跳跳真厉害。\n{name3}每天都要笑哈哈，{name4}开心快乐最重要！'] },
    funny: { name: '搞笑搞怪', templates: ['{name1}吃饭不洗碗，{name2}躺在床上玩手机。\n{name3}虽然有点小懒惰，{name4}但是依然很可爱！'] },
    modern: { name: '现代文艺', templates: ['{name1}在城市的街头，{name2}寻找着诗和远方。\n{name3}时光荏苒匆匆过，{name4}愿你初心永不忘。'] }
};

const loveStyles = {
    romantic: { name: '温柔浪漫', templates: ['想和你一起看日出日落，想和你一起走过四季变换。有你在身边，每一天都是情人节。'] },
    funny: { name: '搞笑搞怪', templates: ['你知道你和星星的区别吗？星星在天上，而你在我心里... 顺便问一下，你什么时候下凡的？'] },
    cute: { name: '可爱卖萌', templates: ['今天也超级喜欢你哦！想要抱抱，想要贴贴，想要和你一直在一起~'] },
    direct: { name: '直球表白', templates: ['我喜欢你，很喜欢很喜欢的那种喜欢。想和你在一起，可以吗？'] },
    literary: { name: '文艺小清新', templates: ['于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里，没有早一步，也没有晚一步，刚巧赶上了。'] }
};

const earthyFlirts = ['你知道我的缺点是什么吗？是缺点你。', '你是哪里人？你是我的心上人。', '我想吃一碗面，你的心里面。'];
const replyStyles = { flirty: ['在想你呀，你呢？'], cute: ['在发呆呢，你找我有什么事呀？'], funny: ['在思考人生大事，比如今天吃什么！'], normal: ['没干嘛，你呢？'] };
const topicStarters = { first_chat: ['你平时喜欢做什么呀？'], ambiguous: ['今天有没有发生什么有趣的事？'], couple: ['今天有没有想我？'] };
const coupleNames = ['{name1}和{name2}的小窝'];
const nicknames = ['{name}小可爱'];
const truthQuestions = ['你最长的一次暗恋持续了多久？'];
const dareTasks = ['给你喜欢的人发一条我想你'];
const luckyItems = [{ item: '大吉', desc: '今天运气超级好，做什么都顺利！', emoji: '🍀' }];

function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function getChar(name, index) { return name[index] || '你'; }
function randomScore(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});

async function callApi(endpoint, method = 'POST', data = null) {
    const url = `/api${endpoint}`;
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (data && method !== 'GET') options.body = JSON.stringify(data);
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (e) {
        return null;
    }
}

async function generatePoem() {
    const name = document.getElementById('poem-name').value.trim();
    const style = document.getElementById('poem-style').value;
    if (!name || name.length < 2 || name.length > 4) {
        document.getElementById('poem-result').innerHTML = '<h3>❌ 请输入2-4个字的名字</h3>';
        return;
    }
    let result = await callApi('/poem', 'POST', { name, style });
    if (!result || !result.success) {
        const styleData = poemStyles[style];
        let template = randomChoice(styleData.templates);
        for (let i = 0; i < 4; i++) template = template.replace(new RegExp(`\\{name${i+1}\\}`, 'g'), getChar(name, i));
        result = { success: true, style_name: styleData.name, poem: template };
    }
    document.getElementById('poem-result').innerHTML = `<h3>✨ ${result.style_name}</h3><div class="content">${result.poem}</div>`;
}

async function generateLove() {
    const name = document.getElementById('love-name').value.trim();
    const style = document.getElementById('love-style').value;
    const scene = document.getElementById('love-scene').value;
    let result = await callApi('/love', 'POST', { name, style, scene });
    if (!result || !result.success) {
        const styleData = loveStyles[style];
        let text = randomChoice(styleData.templates);
        if (name) text = text.replace(/你/g, name);
        result = { success: true, style_name: styleData.name, text };
    }
    document.getElementById('love-result').innerHTML = `<h3>💕 ${result.style_name}</h3><div class="content">${result.text}</div>`;
}

async function generateEarthy() {
    hideAllSubForms();
    let result = await callApi('/chat/earthy', 'GET');
    const flirts = (result && result.flirts) ? result.flirts : [randomChoice(earthyFlirts), randomChoice(earthyFlirts), randomChoice(earthyFlirts)];
    document.getElementById('chat-result').innerHTML = `<h3>😂 土味情话</h3><div class="content">${flirts.map((f, i) => `${i+1}. ${f}`).join('\n\n')}</div>`;
}

function showReplyForm() { hideAllSubForms(); document.getElementById('reply-form').classList.remove('hidden'); }
function showStarterForm() { hideAllSubForms(); document.getElementById('starter-form').classList.remove('hidden'); }
function hideAllSubForms() { document.querySelectorAll('.sub-form').forEach(form => form.classList.add('hidden')); }

async function generateReply() {
    const message = document.getElementById('chat-message').value;
    const style = document.getElementById('chat-style').value;
    let result = await callApi('/chat/reply', 'POST', { message, style });
    const replies = (result && result.replies) ? result.replies : replyStyles[style];
    document.getElementById('chat-result').innerHTML = `<h3>💭 高情商回复</h3><div class="content">${replies.map((r, i) => `${i+1}. ${r}`).join('\n\n')}</div>`;
}

async function generateStarter() {
    const scene = document.getElementById('chat-scene').value;
    let result = await callApi('/chat/starter', 'POST', { scene });
    const starters = (result && result.starters) ? result.starters : topicStarters[scene];
    document.getElementById('chat-result').innerHTML = `<h3>🎯 话题开场白</h3><div class="content">${starters.map((s, i) => `${i+1}. ${s}`).join('\n\n')}</div>`;
}

async function generateTest() {
    const name1 = document.getElementById('test-name1').value.trim();
    const name2 = document.getElementById('test-name2').value.trim();
    const type = document.getElementById('test-type').value;
    if (!name1 || !name2) {
        document.getElementById('test-result').innerHTML = '<h3>❌ 请输入两个人的名字</h3>';
        return;
    }
    let result = await callApi('/test', 'POST', { name1, name2, type });
    const typeName = type === 'romantic' ? '爱情' : '友情';
    const score = (result && result.score) ? result.score : randomScore(60, 99);
    const analysis = (result && result.analysis) ? result.analysis : ['你们的契合度真的很高！在一起会很开心的~'];
    document.getElementById('test-result').innerHTML = `<h3>💕 ${typeName}契合度测试</h3><div class="score">${score}%</div><div class="content">${name1} & ${name2}\n\n${randomChoice(analysis)}</div>`;
}

function generateCoupleName() {
    hideAllSubForms();
    const name1 = prompt('请输入第一个人的名字：');
    const name2 = prompt('请输入第二个人的名字：');
    if (!name1 || !name2) return;
    let coupleName = randomChoice(coupleNames);
    coupleName = coupleName.replace('{name1}', name1).replace('{name2}', name2);
    document.getElementById('interact-result').innerHTML = `<h3>💕 情侣名</h3><div class="content">${coupleName}</div>`;
}

function showNicknameForm() { hideAllSubForms(); document.getElementById('nickname-form').classList.remove('hidden'); }

function generateNickname() {
    const name = document.getElementById('nickname-name').value.trim();
    if (!name) return;
    let nickname = randomChoice(nicknames);
    nickname = nickname.replace('{name}', name);
    document.getElementById('interact-result').innerHTML = `<h3>😜 外号</h3><div class="content">${nickname}</div>`;
}

function truthOrDare() {
    hideAllSubForms();
    const choice = confirm('点击确定=真心话，点击取消=大冒险');
    if (choice) {
        document.getElementById('interact-result').innerHTML = `<h3>🎮 真心话</h3><div class="content">${randomChoice(truthQuestions)}</div>`;
    } else {
        document.getElementById('interact-result').innerHTML = `<h3>🎮 大冒险</h3><div class="content">${randomChoice(dareTasks)}</div>`;
    }
}

function luckyDraw() {
    hideAllSubForms();
    const item = randomChoice(luckyItems);
    document.getElementById('interact-result').innerHTML = `<h3>🍀 每日抽签</h3><div class="content" style="text-align: center; font-size: 1.5em;">${item.emoji} ${item.item}<br><br><span style="font-size: 0.8em;">${item.desc}</span></div>`;
}

console.log('🍬 甜蜜实验室已加载！');
