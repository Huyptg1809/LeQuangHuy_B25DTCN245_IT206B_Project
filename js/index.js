document.addEventListener('DOMContentLoaded', () => {
    initUserMenu();
    initSubscribeForm();
});

function initUserMenu() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.querySelector('.login-btn');

    if (!currentUser || !loginBtn) return;

    const displayName = currentUser.fullName || currentUser.username || currentUser.email || 'User';
    const isAdmin = currentUser.role?.toLowerCase() === 'admin';

    loginBtn.outerHTML = `
        <div class="user-dropdown">
            <a class="login-btn user-name" href="#">
                ${displayName} <span style="font-size: 12px; margin-left: 4px;">▼</span>
            </a>
            <div class="dropdown-content">
                ${isAdmin ? '<a href="admin.html">Admin Manager</a>' : ''}
                <a href="#" id="logoutBtn">LogOut</a>
            </div>
        </div>
    `;

    injectDropdownStyles(); 
    setupLogout();   
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser'); 
            window.location.reload();  
        });
    }
}

function initSubscribeForm() {
    const subscribeForm = document.getElementById('subscribeForm');
    if (!subscribeForm) return;

    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('subscribeEmail').value.trim();
        const btn = document.getElementById('subscribeBtn');

        if (!emailInput) {
            return alert('Vui lòng nhập email');
        }
        setButtonState(btn, true, 'Đang gửi...');

        emailjs.send("service_e95fdbc", "template_zqj7q23", { user_email: emailInput })
            .then(() => {
                alert('Đăng ký nhận thông báo thành công!');
                subscribeForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                alert('Lỗi gửi email. Vui lòng thử lại sau.');
            })
            .finally(() => {
                setButtonState(btn, false, 'Đăng ký');
            });
    });
}

function setButtonState(button, isDisabled, text) {
    if (!button) return;
    button.disabled = isDisabled;
    button.textContent = text;
}

function injectDropdownStyles() {
    if (document.getElementById('dropdown-css')) return;
    
    const style = document.createElement('style');
    style.id = 'dropdown-css';
    style.innerHTML = `
        .user-dropdown { position: relative; display: inline-block; }
        .user-dropdown::after { content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 15px; }
        .user-dropdown .login-btn { display: flex; align-items: center; gap: 5px; }
        .dropdown-content { display: none; position: absolute; top: calc(100% + 10px); right: 0; background: #fff; min-width: 160px; box-shadow: 0 8px 16px rgba(0,0,0,0.2); z-index: 1000; border-radius: 8px; overflow: hidden; border: 1px solid #eee; }
        .dropdown-content a { color: #333 !important; padding: 12px 16px; text-decoration: none; display: block; font-weight: 500; font-size: 14px; }
        .dropdown-content a:hover { background-color: #f1f1f1; }
        .user-dropdown:hover .dropdown-content { display: block; }
    `;
    document.head.appendChild(style);
}
