import { ChangeEvent, useRef } from 'react'
import InputFile from './InputFile'

interface Props {
	className?: string
	onDrop: (e: React.DragEvent<HTMLDivElement>) => void
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function DropZone({ className, onDrop, onChange }: Props): JSX.Element {
	const inputFileRef = useRef<HTMLInputElement | null>(null)

	const handleClick = () => {
		inputFileRef.current?.click()
	}
	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	return (
		<div
			onDrop={onDrop}
			onDragOver={handleDrag}
			onClick={handleClick}
			className={`border-2 border-gray-700 border-solid flex flex-col justify-center items-center cursor-pointer p-5 text-center ${className}`}
		>
			Drop the file in the box <br />
			Or click to upload
			<InputFile accept='image/*' className='hidden' onChange={onChange} ref={inputFileRef} />
		</div>
	)
}
