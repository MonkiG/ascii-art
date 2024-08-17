export default function grayScaleToAscii(
	data: Uint8ClampedArray,
	{ width, height }: { width: number; height: number }
): string {
	// Obtener los datos de la imagen del canvas

	// Mapa de caracteres ASCII ordenados por intensidad
	const asciiChars = '@%#*+=-:. ' // De más oscuro a más claro

	let asciiImage = ''

	// Recorrer los datos de los píxeles
	for (let y = 0; y < height; y += 6) {
		// Ajusta el salto para cambiar la resolución del arte ASCII
		for (let x = 0; x < width; x += 3) {
			// Ajusta el salto para cambiar la resolución del arte ASCII
			const index = (y * width + x) * 4
			const r = data[index]
			const g = data[index + 1]
			const b = data[index + 2]

			// Calcular el valor de gris
			const gray = 0.299 * r + 0.587 * g + 0.114 * b

			// Mapear el valor de gris a un carácter ASCII
			const charIndex = Math.floor((gray / 255) * (asciiChars.length - 1))
			const asciiChar = asciiChars[charIndex]

			asciiImage += asciiChar
		}
		asciiImage += '\n' // Nueva línea después de cada fila
	}

	return asciiImage
}
