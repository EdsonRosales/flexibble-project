"use client"

import { ChangeEvent, useState } from 'react'
import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';

type ProjectFormProps = {
  type: string,
  session: SessionInterface
}

function ProjectForm({ type, session }: ProjectFormProps) {

  const handleFormSubmit = (e: React.FormEvent) => {};

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if(!file) return;

    if(!file.type.includes('image')) {
      return alert('Please upload an image file');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    /** This function pass the image to cloudinary to store him */
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange('image', result);  // <---- Handle image upload that obtaing from the result
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setform((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setform] = useState({
    title: '',
    description: '',
    image: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',
  });

  return (
    <form onSubmit={handleFormSubmit} className='flexStart form'>
      <div className='flexStart form_image-container'>
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

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type='url'
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://jsmastery.pro"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type='url'
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/EdsonRosales"
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      {/* CustomInput Category */}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className='flexStart w-full'>
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' :
              'Editing'}`
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

export default ProjectForm;