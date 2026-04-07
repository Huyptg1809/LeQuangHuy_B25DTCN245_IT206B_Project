document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const loginBtn = document.querySelector('.login-btn');
    
    if (currentUser && loginBtn) {
        const dropdownHtml = `
            <div class="user-dropdown">
                <a class="login-btn user-name" href="#">
                    ${currentUser.fullName || currentUser.username || currentUser.email || 'User'} 
                    <span style="font-size: 12px; margin-left: 4px;">▼</span>
                </a>
                <div class="dropdown-content">
                    ${(currentUser.role === 'admin' || currentUser.role === 'ADMIN') ? '<a href="admin.html">Admin Manager</a>' : ''}
                    <a href="#" id="logoutBtn">LogOut</a>
                </div>
            </div>
        `;
        
        loginBtn.outerHTML = dropdownHtml;

        const style = document.createElement('style');
        style.innerHTML = `
            .user-dropdown {
                position: relative;
                display: inline-block;
            }
            .user-dropdown::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                height: 15px;
                background: transparent;
            }
            .user-dropdown .login-btn {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .dropdown-content {
                display: none;
                position: absolute;
                top: calc(100% + 10px);
                right: 0;
                background-color: #fff;
                min-width: 160px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1000;
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid #eee;
            }
            .dropdown-content a {
                color: #333 !important;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                font-weight: 500;
                font-size: 14px;
                text-align: left;
            }
            .dropdown-content a:hover {
                background-color: #f1f1f1;
            }
            .user-dropdown:hover .dropdown-content {
                display: block;
            }
        `;
        document.head.appendChild(style);

        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }

    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('subscribeEmail').value.trim();
            const btn = document.getElementById('subscribeBtn');

            if (!emailInput) {
                alert('Vui lòng nhập email');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Đang gửi...';

            emailjs.send("service_e95fdbc", "template_zqj7q23", {
                user_email: emailInput,
            }).then(
                () => {
                    alert('Đăng ký nhận thông báo thành công!');
                    subscribeForm.reset();
                    btn.disabled = false;
                    btn.textContent = 'Đăng ký';
                },
                (error) => {
                    console.log('FAILED...', error);
                    alert('Lỗi gửi email: ' + (error.text || error.message || 'Vui lòng kiểm tra lại thông tin và thử lại.'));
                    btn.disabled = false;
                    btn.textContent = 'Đăng ký';
                }
            );
        });
    }
});
