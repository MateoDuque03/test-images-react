import { useRef, useState } from "react"

export function useSearch() {
	const [search, setSearch] = useState('')
	const [error, setError] = useState('')
	const [isDirty, setIsDirty] = useState(false);
	const isFirstSearch = useRef(true) // Sirve para persistir un estado en el tiempo sin refrescar el componente

	const hasError = (search: string) => {
		if (isFirstSearch.current === true) {
			isFirstSearch.current = false;
		}

		if (search === '' && isFirstSearch.current === false) {
			setError('Cannot be empty')
			return true
		}

		if (search.length < 3) {
			setError('Must be longer than 3 characters')
			return true
		}

		if (search.match(/^\d+$/)) {
			setError('Cannot contain numbers')
			return true
		}

		setError('')

		return false
	}

	return {
		search,
		setSearch,
		error,
		hasError,
		isFirstSearch,
		isDirty,
		setIsDirty
	}
}