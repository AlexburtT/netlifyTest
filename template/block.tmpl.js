// block.tmpl.js

window.blockTemplate = (function () {
	return `
<!-- Можно {{}} с пробелами, можно без-->
<div class="{{ className }}">
    <span onClick="{{ handleClick }}">{{text}}</span>
    <span>{{ user.info.firstName }}</span>
</div>
`;
})();

const obj = {
	user: {
		isAdmin: false,
		isPoet: true,
		info: {
			firstName: 'Alexander',
			lastName: 'Pushkin'
		}
	}
};

get(obj, 'user.isPoet'); // true
get(obj, 'user.info.firstName'); // Alexander
get(obj, 'user.info.contacts'); // undefined
get(obj, 'user.info.contacts.email'); // undefined
get(obj, 'user.info.contacts.email', 'a.pushkin@ya.ru'); // 'a.pushkin@ya.ru'
get(obj, 'user.isAdmin', true); // false

function get(obj, path, defaultValue) {
	const keys = path.split('.');

	let result = obj;
	for (let key of keys) {
		result = result[key];

		if (result === undefined) {
			return defaultValue;
		}
	}

	return result ?? defaultValue; // "??" — [оператор нулевого слияния](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (не поддерживается старыми браузерами, для них нужен полифилл)
}