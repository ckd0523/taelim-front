import { HORIZONTAL_MENU_ITEMS, MENU_ITEMS } from '@/common/menu-items';
import { useAuthContext } from '@/common';

const getMenuItems = () => {
	const { user } = useAuthContext(); // 현재 사용자 정보 가져오기

	// 역할에 따른 메뉴 필터링
	const filteredMenuItems = MENU_ITEMS.filter((item) => {
		if (user.role === 'ADMIN') {
			// admin은 모든 메뉴를 볼 수 있음
			return true;
		} else if (user.role === 'ASSET_MANAGER') {
			// manager는 '요청내역', '시스템 설정'을 제외한 모든 메뉴를 볼 수 있음
			return !['ds-DemandHistory', 'ds-SystemSetting'].includes(item.key);
		} else if (user.role === 'USER') {
			// user는 '대시보드'와 '자산조회'만 볼 수 있음
			return ['jsx', 'ds-Dashboard', 'check'].includes(item.key);
		}

		return false;
	});

	return filteredMenuItems;
};

const getHorizontalMenuItems = () => {
	// NOTE - You can fetch from server and return here as well
	return HORIZONTAL_MENU_ITEMS;
};

const findAllParent = (menuItems, menuItem) => {
	let parents = [];
	const parent = findMenuItem(menuItems, menuItem['parentKey']);

	if (parent) {
		parents.push(parent['key']);
		if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
	}
	return parents;
};

const findMenuItem = (menuItems, menuItemKey) => {
	if (menuItems && menuItemKey) {
		for (let i = 0; i < menuItems.length; i++) {
			if (menuItems[i].key === menuItemKey) {
				return menuItems[i];
			}
			const found = findMenuItem(menuItems[i].children, menuItemKey);
			if (found) return found;
		}
	}
	return null;
};

export { getMenuItems, getHorizontalMenuItems, findAllParent, findMenuItem };
