import axiosInstance from '@/services/AxiosInstance';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone'

const ChangeAvatar = () => {
	const [image, setImage] = useState<File | null>(null);

	const onDrop = async (acceptedFiles: File[]) => {
		setImage(acceptedFiles[0]);

		const imageToString = await convertImage(acceptedFiles[0]);
		await sendImage(imageToString);
	};

	const convertImage = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	const sendImage = async (imageToString: string) => {
		try {
			const response = await axiosInstance.post(`/users/change-avatar`, {image: imageToString});
			console.log(response);
		}
		catch (error) {
			console.error('mauvais envoi', error);
		}
	}

	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>Changer d&apos;avatar: glisser une image</h2>
			<ImageDropZone onDrop={onDrop} />
			{image && (
				<div>
					<h3>Image téléchargée</h3>
					<img
						src={URL.createObjectURL(image)}
						alt="Uploaded"
						style={{ width: '100%', height: 'auto' }}
					/>
				</div>
			)}
		</div>
	);
}


const ImageDropZone = ({ onDrop }: { onDrop: (files: File[]) => void }) => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()} style={dropzoneStyles}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Glissez une image ici...</p>
			) : (
				<p>Cliquez pour sélectionner une image ou glissez une image</p>
			)}
		</div>
	);
};

const dropzoneStyles: React.CSSProperties = {
	border: '2px dashed',
	borderRadius: '4px',
	padding: '20px',
	textAlign: 'center',
	cursor: 'pointer',
};


export default ChangeAvatar;