"use client"

import { ChangeEvent } from 'react'
import { SessionInterface } from '@/common.types';

type ProjectFormProps = {
    type: string,
    session: SessionInterface
}

function ProjectForm({ type, session }: ProjectFormProps) {

  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};

  const image = null;

  return (
    <form onSubmit={handleFormSubmit} className='flexstart form'>
        <div className='flexstart form_image-container'>
            <label htmlFor='poster' className='flexCenter form_image-label'>
                {!image && 'Choose a poster for you project'}
            </label>
            <input
                id='image'
                type='file'
                accept='image/*'
                required={type === 'create'}
                className='form_image-input'
                onChange={handleChangeImage}
            />
        </div>
    </form>
  )
}

export default ProjectForm;