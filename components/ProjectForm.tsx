'use client'
import { SessionInterface } from '@/common.types'
import Image from 'next/image'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import FormField from './FormField'
import { categoryFilters } from '@/constants'
import CustomMenu from './CustomMenu'
import Button from './Button'

interface ProjectFormProps {
  type: 'create' | 'edit'
  session: SessionInterface
}
type formType = {
  title: string
  description: string
  liveSiteUrl: string
  image: string
  category: string
  githubUrl: string
}
const defaultFrom: formType = {
  title: '',
  description: '',
  liveSiteUrl: '',
  image: '',
  category: '',
  githubUrl: '',
}
const ProjectForm: FC<ProjectFormProps> = ({ type, session }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [form, setForm] = useState<formType>(defaultFrom)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {}

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.includes('image'))
      return alert('Please upload an image file')

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string
      handleStateChange('image', result)
    }
  }

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }))
  }
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster from your project'}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="z-20 object-contain sm:p-10"
            alt="project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkble developer projects."
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://flexibble.com"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/flexibble"
        setState={(value) => handleStateChange('githubUrl', value)}
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />
      <div className="w-full flexStart">
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm