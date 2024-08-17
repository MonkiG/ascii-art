export default function fileToImage(file: File): Promise<HTMLImageElement> {
	return new Promise((res) => {
		const reader = new FileReader()
		const img = new Image()
		reader.onload = () => {
			img.src = reader.result as string
			img.onload = () => res(img)
		}

		reader.readAsDataURL(file)
	})
}
