"use client"

import { ChangeEvent } from 'react'
import { SessionInterface } from '@/common.types';
import Image from 'next/image';

type ProjectFormProps = {
    type: string,
    session: SessionInterface
}

function ProjectForm({ type, session }: ProjectFormProps) {

  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};

  const form = {
    image: ''
  };

  return (
    <form onSubmit={handleFormSubmit} className='flexstart form'>
        <div className='flexstart form_image-container'>
            <label htmlFor='poster' className='flexCenter form_image-label'>
                {!form.image && 'Choose a poster for you project'}
            </label>
            <input
                id='image'
                type='file'
                accept='image/*'
                required={type === 'create'}
                className='form_image-input'
                onChange={handleChangeImage}
            />
            {form.image && (
                <Image
                    src={form?.image}
                    className='sm:p-10 object-contain z-20'
                    alt='Project poster'
                    fill
                />
            )}
        </div>
    </form>
  )
}

export default ProjectForm;