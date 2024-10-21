import { useRef, useState } from "react"

export function useSearch() {
	const [search, setSearch] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const isFirstSearch = useRef<boolean>(true)

	const hasError = (search: string) : boolean => {
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