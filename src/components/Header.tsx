import logo from './../assets/logo.png'
import { useSearch } from '../hooks/useSearch';
import { useDebounce } from '../hooks/useDebounce';
import { ChangeEvent, FormEvent } from 'react';
import { useImagesContext } from '../context/useImageContext';

const Header = () => {
	const { search, setSearch, error, hasError, isDirty, setIsDirty } = useSearch();
	const { getByName } = useImagesContext();
	const debounce = useDebounce()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (error === '') {
			await getByName(search);
		}
	};

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setSearch(newValue);
		if (!hasError(newValue)) {
			debounce(async () => {
				await getByName(newValue);
			}, 1200)
		};
	};

	// Handle blur (when user leaves the field)
  const handleBlur = () => {
    setIsDirty(true);
  };

	return (
		<>
			<img src={logo} className='header-icon' />
			<form action="form" onSubmit={handleSubmit}>
				<div className="search-bar">
					<i className="search-icon fas fa-search"></i>
					<input
						id="search"
						value={search}
						onChange={handleChange}
						onBlur={handleBlur}
						type="text"
						placeholder="You're looking for something?"
					/>
				</div>
				{isDirty && error ? <span className='error-message'>{error}</span> : null}
			</form>
		</>
	)
}

export default Header