import React, { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import supabase from '../config/supabaseClient';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      onImageSelect(file); // Pass the selected file to the parent component
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
    </div>
  );
}

export default ImageUpload;
