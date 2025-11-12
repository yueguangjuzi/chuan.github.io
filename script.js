class RomanticPopup {
    constructor() {
        this.popups = [];
        this.allMessages = [];
        this.container = document.getElementById('popupContainer');
        this.startScreen = document.getElementById('startScreen');
        this.startButton = document.getElementById('startButton');
        
        this.init();
    }
    
    init() {
        // 准备消息：每条消息弹出2次
        this.allMessages = [...LOVE_MESSAGES, ...LOVE_MESSAGES];
        // 随机打乱顺序
        this.shuffleArray(this.allMessages);
        
        // 绑定开始按钮
        this.startButton.addEventListener('click', () => {
            this.startAnimation();
        });
    }
    
    // 随机打乱数组
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // 开始动画
    startAnimation() {
        console.log('🎀 浪漫弹窗程序启动 🎀');
        console.log(`准备显示 ${this.allMessages.length} 条爱的消息...`);
        console.log('💝 最后会有惊喜哦...');
        
        // 隐藏开始屏幕
        this.startScreen.classList.add('hidden');
        
        // 显示所有弹窗
        this.showAllPopups();
    }
    
    // 创建单个弹窗
    createPopup(message, index) {
        const popup = document.createElement('div');
        popup.className = `popup color-${index % 8}`;
        popup.textContent = message;
        
        // 随机位置
        const x = Math.random() * (window.innerWidth - 280);
        const y = Math.random() * (window.innerHeight - 120);
        
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        
        // 保存初始位置
        popup.dataset.currentX = x;
        popup.dataset.currentY = y;
        
        this.container.appendChild(popup);
        
        // 渐入动画
        setTimeout(() => {
            popup.style.opacity = '1';
        }, 50);
        
        return popup;
    }
    
    // 显示所有弹窗
    showAllPopups() {
        this.allMessages.forEach((message, index) => {
            setTimeout(() => {
                const popup = this.createPopup(message, index);
                this.popups.push(popup);
            }, index * 100); // 每0.1秒显示一个
        });
        
        // 所有弹窗显示完毕后等待3秒，然后汇聚成心形
        const displayTime = this.allMessages.length * 100 + 3000;
        setTimeout(() => {
            this.formHeartShape();
        }, displayTime);
    }
    
    // 生成心形曲线上的点
    generateHeartPoints(numPoints, centerX, centerY, scale = 250) {
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            const t = (i / numPoints) * 2 * Math.PI;
            // 心形参数方程
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            // 缩放和平移
            const finalX = centerX + x * scale / 16;
            const finalY = centerY + y * scale / 16;
            
            points.push({ x: finalX, y: finalY });
        }
        return points;
    }
    
    // 汇聚成心形
    formHeartShape() {
        console.log('💖 开始汇聚成心形...');
        
        const centerX = window.innerWidth / 2 - 140;
        const centerY = window.innerHeight / 2 - 60;
        
        const heartPoints = this.generateHeartPoints(this.popups.length, centerX, centerY, 250);
        
        this.popups.forEach((popup, index) => {
            setTimeout(() => {
                const target = heartPoints[index];
                this.moveToPosition(popup, target.x, target.y, 1200); // 1.2秒
            }, index * 10);
        });
        
        // 心形保持4秒后升空
        setTimeout(() => {
            this.riseToSky();
        }, 4000);
    }
    
    // 平滑移动到目标位置
    moveToPosition(popup, targetX, targetY, duration) {
        const startX = parseFloat(popup.dataset.currentX);
        const startY = parseFloat(popup.dataset.currentY);
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 缓出效果
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentX = startX + (targetX - startX) * easeProgress;
            const currentY = startY + (targetY - startY) * easeProgress;
            
            popup.style.left = `${currentX}px`;
            popup.style.top = `${currentY}px`;
            
            popup.dataset.currentX = currentX;
            popup.dataset.currentY = currentY;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    // 升到天空
    riseToSky() {
        console.log('🚀 升到天空...');
        
        this.popups.forEach((popup, index) => {
            setTimeout(() => {
                const targetX = (index / this.popups.length) * (window.innerWidth - 280);
                const targetY = -150;
                this.moveToPosition(popup, targetX, targetY, 1000); // 1秒
            }, Math.random() * 500);
        });
        
        // 升空完成后等待2秒，开始降落
        setTimeout(() => {
            this.fallAsStars();
        }, 2000);
    }
    
    // 化成流星雨降落
    fallAsStars() {
        console.log('✨ 化成满天星光降落...');
        
        this.popups.forEach((popup) => {
            setTimeout(() => {
                const randomX = Math.random() * (window.innerWidth - 280);
                this.fallDownLikeStar(popup, randomX);
            }, Math.random() * 8000); // 8秒内随机开始降落
        });
        
        // 等待所有动画完成后显示结束信息
        setTimeout(() => {
            this.showEndMessage();
        }, 14000);
    }
    
    // 像流星一样降落
    fallDownLikeStar(popup, targetX) {
        const startX = parseFloat(popup.dataset.currentX);
        const startY = parseFloat(popup.dataset.currentY);
        const endY = window.innerHeight + 200;
        const duration = 3000; // 3秒
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 加速下落效果
            const easeProgress = Math.pow(progress, 2.2);
            
            const currentX = startX + (targetX - startX) * progress;
            const currentY = startY + (endY - startY) * easeProgress;
            
            // 透明度：降落到80%才开始快速消失
            const alpha = progress < 0.8 ? 1.0 : Math.max(0, 1.0 - (progress - 0.8) * 5);
            
            popup.style.left = `${currentX}px`;
            popup.style.top = `${currentY}px`;
            popup.style.opacity = alpha;
            
            popup.dataset.currentX = currentX;
            popup.dataset.currentY = currentY;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                popup.remove();
            }
        };
        
        animate();
    }
    
    // 显示结束信息
    showEndMessage() {
        console.log('程序已结束');
        
        // 创建结束提示
        const endDiv = document.createElement('div');
        endDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ffe0f0 0%, #ffd4e5 100%);
            padding: 3rem 5rem;
            border-radius: 30px;
            box-shadow: 0 30px 80px rgba(255, 20, 147, 0.4);
            text-align: center;
            opacity: 0;
            transition: opacity 1s ease;
            z-index: 10000;
            border: 3px solid rgba(255, 105, 180, 0.3);
        `;
        
        endDiv.innerHTML = `
            <h1 style="font-size: 3rem; margin-bottom: 1rem; background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">💝</h1>
            <p style="font-size: 1.5rem; color: #c41e3a; font-weight: 600;">爱你，永远 ❤️</p>
            <button onclick="location.reload()" style="
                margin-top: 2rem;
                padding: 0.8rem 2rem;
                font-size: 1.2rem;
                background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(255, 20, 147, 0.4);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 40px rgba(255, 20, 147, 0.6)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(255, 20, 147, 0.4)'">再看一次 ✨</button>
        `;
        
        document.body.appendChild(endDiv);
        
        setTimeout(() => {
            endDiv.style.opacity = '1';
        }, 100);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new RomanticPopup();
});

