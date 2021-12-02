import { useEffect } from 'react'

function Logout() {
	useEffect(() => {
		const token = localStorage.getItem('token');
		if(token) {
			localStorage.removeItem('token');
            localStorage.removeItem('type');
		}
        window.location.href = '/login';
	},[])

	return null
}

export default Logout