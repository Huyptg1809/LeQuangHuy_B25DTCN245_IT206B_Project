const DEFAULT_USERS = [
    {
        id: 1,
        fullName: 'Huy Admin',
        email: 'huy.ptg.media@gmail.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
    },
    {
        id: 2,
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        password: 'Matkhau123',
        role: 'user',
        isActive: true
    },
    {
        id: 3,
        fullName: 'Trần Thị B',
        email: 'tranthib@example.com',
        password: '12345678',
        role: 'user',
        isActive: false 
    }
];

function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    if (!document.getElementById('rikkei-toast-css')) {
        const style = document.createElement('style');
        style.id = 'rikkei-toast-css';
        style.innerHTML = `
            #toastContainer {
                position: fixed;
                top: 80px; 
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .rikkei-toast {
                background-color: #2b3036;
                color: #fff;
                border-radius: 6px;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                gap: 16px;
                width: 380px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                position: relative;
                overflow: hidden;
                animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                font-family: inherit;
            }
            .rikkei-toast.hide {
                animation: fadeOutRight 0.3s ease-out forwards;
            }
            /* Vệt màu ở bên trái (Xanh/Đỏ) */
            .rikkei-toast::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 6px;
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            }
            .rikkei-toast.success::before {
                background-color: #4cd137;
            }
            .rikkei-toast.error::before {
                background-color: #e84118;
            }
            .rikkei-toast .icon {
                width: 26px;
                height: 26px;
                flex-shrink: 0;
            }
            .rikkei-toast .content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            .rikkei-toast .title {
                font-size: 16px;
                font-weight: 500;
                letter-spacing: 0.5px;
            }
            .rikkei-toast .message {
                font-size: 14px;
                color: #d1d8e0;
                line-height: 1.4;
            }
            .rikkei-toast .close-btn {
                background: none;
                border: none;
                color: #718093;
                font-size: 22px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                margin-left: auto;
                align-self: flex-start;
                transition: color 0.2s;
            }
            .rikkei-toast .close-btn:hover {
                color: #fff;
            }
            @keyframes slideInRight {
                from { transform: translateX(120%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(120%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    const toastItem = document.createElement('div');
    toastItem.className = `rikkei-toast ${type}`;
    
    const titleText = type === 'success' ? 'Đăng nhập thành công' : 'Đăng nhập thất bại';
    
    const successIcon = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4cd137" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    const errorIcon = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e84118" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

    toastItem.innerHTML = `
        ${type === 'success' ? successIcon : errorIcon}
        <div class="content">
            <div class="title">${titleText}</div>
            <div class="message">${message}</div>
        </div>
        <button class="close-btn">&times;</button>
    `;

    toastContainer.appendChild(toastItem);

    const closeToast = () => {
        toastItem.classList.add('hide'); 
        setTimeout(() => toastItem.remove(), 300);
    };

    toastItem.querySelector('.close-btn').addEventListener('click', closeToast);
    setTimeout(closeToast, 4000); 
}

function initData() {
    const storedUsers = localStorage.getItem('users');
    
    if (!storedUsers) {
        localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'index.html';
        return;
    }

    initData();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (email === '') {
                showToast('Email không được để trống.', 'error');
                return;
            }
            if (password === '') {
                showToast('Mật khẩu không được để trống.', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users'));

            const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

            if (!foundUser) {
                showToast('Tài khoản hoặc mật khẩu sai.', 'error');
            } 
            else if (foundUser.password !== password) {
                showToast('Tài khoản hoặc mật khẩu sai.', 'error');
            } 
            else if (foundUser.isActive === false) {
                showToast('Tài khoản của bạn đang bị khóa.', 'error');
            } 
            else {
                showToast('Chào mừng bạn đến với trang web của Rikkei.', 'success');

                localStorage.setItem('currentUser', JSON.stringify(foundUser));

                setTimeout(() => {
                    if (foundUser.role.toLowerCase() === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 800);
            }
        });
    }
});
