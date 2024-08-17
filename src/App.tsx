import { ChangeEvent, useRef, useState } from 'react'
import DropZone from './components/DropZone'
import fileToImage from './utils/fileToImage'
import imageToGrayScale from './utils/imageToGrayScale'
import grayScaleToAscii from './utils/grayScaleToAscii'

export default function App() {
	const fileRef = useRef<File>()
	const [previwImageUrl, setPreviewImageUrl] = useState<string>()
	const [asciiArt, setAsciiArt] = useState<string>()

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const file = e.dataTransfer.files[0]
		const previewUrl = URL.createObjectURL(file)
		fileRef.current = file
		setPreviewImageUrl(previewUrl)
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]
		const previewUrl = URL.createObjectURL(file)
		fileRef.current = file
		setPreviewImageUrl(previewUrl)
	}

	const handleClick = () => {
		if (!fileRef.current) throw new Error('Upload an image first')
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		if (!ctx) throw new Error('No 2D context available')

		fileToImage(fileRef.current).then((img) => {
			if (!canvas) throw new Error('No canvas reference')
			canvas.width = img.width
			canvas.height = img.height
			ctx.drawImage(img, 0, 0)
			const imageData = ctx.getImageData(0, 0, img.width, img.height)
			imageToGrayScale(imageData.data)
			ctx.putImageData(imageData, 0, 0)

			const ascii = grayScaleToAscii(imageData.data, { width: canvas.width, height: canvas.height })
			setAsciiArt(ascii)
		})
	}

	return (
		<>
			<h1 className='text-4xl font-bold text-center m-5'>Ascii Art 🎨</h1>
			<div className='flex justify-evenly h-1/2 mx-5'>
				<div className=''>
					<DropZone onDrop={handleDrop} onChange={handleFileChange} />
					<button onClick={handleClick} className='w-full my-3 bg-slate-500 text-white rounded-md'>
						Generate ascii art
					</button>
				</div>
				{previwImageUrl && <img src={previwImageUrl} alt='previe image' className='' />}
			</div>
			{asciiArt && <pre>{asciiArt}</pre>}
		</>
	)
}
