import React, { useEffect } from 'react'

export const useHomePage = () => {

	const onLogin = (token) => {
		return ("/HomePage");
	};

	const onPageLoad = (token) => {
		if(token != null){
			return ("/");
		}
		else {
			return ("/");
		}
	};

	return { onLogin, onPageLoad }
}
