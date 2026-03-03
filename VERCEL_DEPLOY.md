# 🚀 Vercel 部署详细指南

这是专门为 Vercel 优化的版本，按步骤操作一定成功！

---

## 📦 正确的目录结构（重要！）

把这些文件放到你的仓库根目录：

```
你的仓库/
├── api/
│   └── index.py          # 后端 API
├── public/
│   ├── index.html        # 前端页面
│   ├── style.css         # 样式
│   └── script.js         # 逻辑
├── requirements.txt      # Python 依赖
└── vercel.json          # Vercel 配置
```

---

## 🎯 步骤一：准备文件

用我给你的 `sweet-lab-vercel.zip` 里面的文件！

或者从这里复制：
- `api/index.py` → 后端
- `public/*` → 前端三个文件
- `requirements.txt` → 依赖
- `vercel.json` → 配置

---

## 🚀 步骤二：推送到 GitHub

1. 在 GitHub 创建一个新仓库
2. 把上面的文件推送到 GitHub

---

## 🌟 步骤三：导入 Vercel

1. 去 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 **Add New...** → **Project**
4. 选择你刚才的仓库
5. 点击 **Import**

---

## ⚙️ 步骤四：配置项目（关键！）

在 Configure Project 页面：

### Project Name
随便填，比如 `sweet-lab`

### Framework Preset
选择 **Other**

### Root Directory
**留空！**（不要改）

### Build Command
**留空！**

### Output Directory
**留空！**

### Install Command
**留空！**（Vercel 会自动检测）

---

## ✅ 步骤五：部署

点击 **Deploy** 按钮！

等待 1-2 分钟...

---

## 🎉 完成！

部署成功后会显示：
- 🟢 **Congratulations!**
- 你的网址类似：`https://sweet-lab-xxx.vercel.app`

---

## 🔍 测试一下

1. 打开你的 Vercel 网址
2. 试试生成藏头诗
3. 应该能正常工作！

---

## ❓ 常见问题

### Q: 还是显示无法连接后端？
A: 检查这几点：
1. 目录结构对吗？（api/ 和 public/ 都在根目录）
2. vercel.json 存在吗？
3. 浏览器控制台（F12）有什么错误？

### Q: 后端返回 404？
A: 访问 `https://你的域名/api/` 应该返回 `{"status":"ok"}`

如果不是，检查：
- api/index.py 文件名对吗？
- requirements.txt 存在吗？

### Q: 还是不行？
A: 用 **纯前端版本** 吧！
- 用 `web/` 目录的文件
- 直接部署 GitHub Pages
- 不用后端也能用！

---

## 📞 还是有问题？

把这两个信息发给我：
1. 你的 Vercel 网址
2. 浏览器控制台（F12）的截图

我帮你排查！

---

**加油！你可以的！** 🍬💖
