import Image from 'next/image'
import { FC, MouseEventHandler } from 'react'

interface ButtonProps {
  title: string
  type?: 'button' | 'submit'
  leftIcon?: string | null
  RightIcon?: string | null
  isSubmitting?: boolean
  handleClick?: MouseEventHandler
  bgColor?: string
  textColor?: string
}

const Button: FC<ButtonProps> = ({
  title,
  type = 'button',
  leftIcon,
  RightIcon,
  isSubmitting,
  handleClick,
  bgColor,
  textColor,
}) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className={`gap-3 px-4 py-3 flexCenter 
      ${textColor || 'text-white'}
      ${
        isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'
      } rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
      //TODO: Add bg and text color props
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="left icon" />
      )}
      {title}
      {RightIcon && (
        <Image src={RightIcon} width={14} height={14} alt="right icon" />
      )}
    </button>
  )
}

export default Button
