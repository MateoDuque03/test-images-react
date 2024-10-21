import { Image } from "../models/Image"

export const getImages = async (page: number) => {
	try {
    const response = await fetch(
      `http://localhost:3100/images?page=${page}`
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.error("Error fetching data");
  }
}

export const getImagesByName = async (search: string) => {
	if (!search) return [];

	try {
    const response = await fetch(
      `http://localhost:3100/images?search=${search}`
    )
    const json = await response.json()
    const images = json.filter((movie: Image) => movie.title.toLowerCase().includes(search.toLowerCase()))
		return images
  } catch (error) {
    console.error("Error fetching data");
  }
};

