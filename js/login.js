function showWarning(message) {
	alert(message);
}

function getUsers() {
	const defaultAdmin = {
		email: 'admin@rikkei.vn',
		password: 'Admin@123',
		role: 'ADMIN'
	};

	const usersFromStorage = localStorage.getItem('users');

	if (!usersFromStorage) {
		return [defaultAdmin];
	}

	try {
		const parsedUsers = JSON.parse(usersFromStorage);

		if (Array.isArray(parsedUsers)) {
			return [defaultAdmin].concat(parsedUsers);
		}

		return [defaultAdmin];
	} catch (error) {
		return [defaultAdmin];
	}
}

function findUserByEmail(email, users) {
	return users.find(function(user) {
		return user.email && user.email.toLowerCase() === email.toLowerCase();
	});
}

document.addEventListener('DOMContentLoaded', function() {
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
			showWarning('Email không được để trống');
			return;
		}

		if (password === '') {
			showWarning('Mật khẩu không được để trống');
			return;
		}

		const users = getUsers();
		const foundUser = findUserByEmail(email, users);

		if (!foundUser) {
			showWarning('Email hoặc Mật khẩu không đúng');
			return;
		}

		if (foundUser.password !== password) {
			showWarning('Email hoặc Mật khẩu không đúng');
			return;
		}

		localStorage.setItem('currentUser', JSON.stringify(foundUser));

		if (foundUser.role === 'ADMIN') {
			window.location.href = 'index.html';
		} else {
			window.location.href = 'index.html';
		}
	});
});
