import { forwardRef } from 'react'

interface Props {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	className?: string
	accept: string
}

const InputFile = forwardRef<HTMLInputElement, Props>(({ onChange, className }, ref) => {
	return <input type='file' ref={ref} onChange={onChange} className={className} />
})

export default InputFile
