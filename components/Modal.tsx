'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback, useRef } from 'react'

interface ModalProps {
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ children }) => {
  const overlay = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const onDismiss = useCallback(() => {
    router.push('/')
  }, [router])
  const handelClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === overlay.current && onDismiss) onDismiss()
    },
    [onDismiss, overlay]
  )
  return (
    <div ref={overlay} className="modal" onClick={handelClick}>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-2 right-8"
      >
        <Image src="/close.svg" alt="close" width={17} height={17} />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  )
}

export default Modal
