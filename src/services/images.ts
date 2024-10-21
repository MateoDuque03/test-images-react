import { Image } from "../models/Image"
const API_URL = 'http://localhost:3100/images'

export const getImages = async (page: number) => {
	try {
    const response = await fetch(
      `${API_URL}?page=${page}`
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
      `${API_URL}?search=${search}`
    )
    const json = await response.json()
    const images = json.filter((image: Image) => image.title.toLowerCase().includes(search.toLowerCase()))
		return images
  } catch (error) {
    console.error("Error fetching data");
  }
};

export const setLikeToImage = async (id: number) => {
  try {
    const response = await fetch(
      `${API_URL}/${id}/likes`,
      {
        method: "POST"
      }
    )
    return response.status
  } catch (error) {
    console.error("Error fetching data");
  }
};

