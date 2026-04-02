const STORAGE_KEYS = {
	APP_DATA: 'User',
	LEGACY_APP_DATA: 'appData',
	USERS: 'users',
	CURRENT_USER: 'currentUser'
};

const DEFAULT_USERS = [
	{
		id: 1,
		fullName: 'Admin Chính',
		email: 'huy.ptg.media@gmail.com',
		password: 'admin123',
		role: 'admin',
		createdAt: '2026-03-03T12:26:21.617Z',
		isActive: true
	},
	{
		id: 2,
		fullName: 'Nguyễn Văn A',
		email: 'nguyenvana@example.com',
		password: 'Matkhau123',
		role: 'user',
		createdAt: '2026-03-01T12:26:21.617Z',
		isActive: true
	},
	{
		id: 3,
		fullName: 'Trần Thị B',
		email: 'tranthib@example.com',
		password: '12345678',
		role: 'user',
		createdAt: '2026-03-03T12:26:21.617Z',
		isActive: false
	}
];

function showToast(message, type) {
	const toastContainer = document.getElementById('toastContainer');
	const navbar = document.querySelector('.navbar');

	if (!toastContainer) {
		return;
	}

	if (navbar) {
		toastContainer.style.top = navbar.offsetHeight + 16 + 'px';
	}

	const toastItem = document.createElement('div');
	toastItem.className = 'toast-item';

	const toastIcon = document.createElement('img');
	toastIcon.className = 'toast-icon';
	toastIcon.alt = 'Toast icon';

	if (type === 'success') {
		toastIcon.src = '../assets/icons/success.png';
	} else {
		toastIcon.src = '../assets/icons/cancel.png';
		toastItem.classList.add('error');
	}

	const toastText = document.createElement('span');
	toastText.textContent = message;

	toastItem.appendChild(toastIcon);
	toastItem.appendChild(toastText);
	toastContainer.appendChild(toastItem);

	window.setTimeout(function() {
		toastItem.classList.add('hide');

		window.setTimeout(function() {
			toastItem.remove();
		}, 220);
	}, 3000);
}

function createDefaultData() {
	return {
		users: DEFAULT_USERS
	};
}

function seedDefaultDataIfNeeded() {
	const appDataRaw = localStorage.getItem(STORAGE_KEYS.APP_DATA);
	const legacyAppDataRaw = localStorage.getItem(STORAGE_KEYS.LEGACY_APP_DATA);
	const usersRaw = localStorage.getItem(STORAGE_KEYS.USERS);

	if (!appDataRaw && !legacyAppDataRaw && !usersRaw) {
		const defaultData = createDefaultData();
		localStorage.setItem(STORAGE_KEYS.APP_DATA, JSON.stringify(defaultData));
		return;
	}

	const currentData = readStoredData();
	const mergedUsers = currentData.users.slice();

	DEFAULT_USERS.forEach(function(defaultUser) {
		const foundIndex = mergedUsers.findIndex(function(user) {
			return String(user.email || '').toLowerCase() === defaultUser.email.toLowerCase();
		});

		if (foundIndex === -1) {
			mergedUsers.push(defaultUser);
		} else {
			mergedUsers[foundIndex] = {
				...mergedUsers[foundIndex],
				...defaultUser
			};
		}
	});

	localStorage.setItem(STORAGE_KEYS.APP_DATA, JSON.stringify({ users: mergedUsers }));
}

function readStoredData() {
	const appDataRaw = localStorage.getItem(STORAGE_KEYS.APP_DATA);
	const legacyAppDataRaw = localStorage.getItem(STORAGE_KEYS.LEGACY_APP_DATA);
	const usersRaw = localStorage.getItem(STORAGE_KEYS.USERS);

	if (!appDataRaw && !legacyAppDataRaw && !usersRaw) {
		return createDefaultData();
	}

	try {
		if (appDataRaw) {
			const parsedAppData = JSON.parse(appDataRaw);

			if (parsedAppData && Array.isArray(parsedAppData.users)) {
				return parsedAppData;
			}
		}

		if (legacyAppDataRaw) {
			const parsedLegacyAppData = JSON.parse(legacyAppDataRaw);

			if (parsedLegacyAppData && Array.isArray(parsedLegacyAppData.users)) {
				localStorage.setItem(STORAGE_KEYS.APP_DATA, JSON.stringify(parsedLegacyAppData));
				return parsedLegacyAppData;
			}
		}

		if (usersRaw) {
			const parsedUsers = JSON.parse(usersRaw);

			if (Array.isArray(parsedUsers)) {
				return { users: parsedUsers };
			}

			if (parsedUsers && Array.isArray(parsedUsers.users)) {
				return parsedUsers;
			}
		}
	} catch (error) {
		return createDefaultData();
	}

	return createDefaultData();
}

function normalizeUser(user) {
	return {
		id: user.id || Date.now(),
		fullName: user.fullName || '',
		email: String(user.email || '').trim(),
		password: String(user.password || ''),
		role: String(user.role || 'user').toUpperCase(),
		createdAt: user.createdAt || new Date().toISOString(),
		isActive: user.isActive !== false
	};
}

function getUsers() {
	const data = readStoredData();
	return data.users.map(normalizeUser);
}

function findUserByEmail(email, users) {
	return users.find(function(user) {
		return user.email.toLowerCase() === email.toLowerCase();
	});
}

document.addEventListener('DOMContentLoaded', function() {
	seedDefaultDataIfNeeded();

	const loginForm = document.getElementById('loginForm');

	if (!loginForm) {
		return;
	}

	loginForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const emailInput = document.getElementById('email');
		const passwordInput = document.getElementById('password');

		const email = emailInput ? emailInput.value.trim() : '';
		const password = passwordInput ? passwordInput.value : '';

		if (email === '') {
			showToast('Email không được để trống', 'error');
			return;
		}

		if (password === '') {
			showToast('Mật khẩu không được để trống', 'error');
			return;
		}

		const users = getUsers();
		const foundUser = findUserByEmail(email, users);

		if (!foundUser) {
			showToast('Email hoặc Mật khẩu không đúng', 'error');
			return;
		}

		if (foundUser.password !== password) {
			showToast('Email hoặc Mật khẩu không đúng', 'error');
			return;
		}

		if (!foundUser.isActive) {
			showToast('Tài khoản của bạn đang bị khóa', 'error');
			return;
		}

		localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(foundUser));
		showToast('Đăng nhập thành công', 'success');

		if (foundUser.role === 'ADMIN') {
			window.setTimeout(function() {
				window.location.href = 'admin.html';
			}, 800);
		} else {
			window.setTimeout(function() {
				window.location.href = 'index.html';
			}, 800);
		}
	});
});
