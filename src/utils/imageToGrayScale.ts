export default function imageToGrayScale(data: Uint8ClampedArray): void {
	for (let i = 0; i < data.length; i += 4) {
		// Usar coeficientes para calcular la luminosidad
		const grayscale = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114

		data[i] = grayscale // Rojo
		data[i + 1] = grayscale // Verde
		data[i + 2] = grayscale // Azul
		data[i + 3] = 255 // Alfa (mantener el canal alfa)
	}
}
