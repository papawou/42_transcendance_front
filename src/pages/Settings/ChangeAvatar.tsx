import axiosInstance from '@/services/AxiosInstance';
import React from 'react';
import { useDropzone } from 'react-dropzone'

const ChangeAvatar = () => {

	const onDrop = async (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];

		const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
		const maxFileSize = 200 * 1024;

		if (!allowedTypes.includes(file.type)) {
			console.error('Invalid file type. Please upload a valid image.');
			return;
		}

		if (file.size > maxFileSize) {
			console.error('File size exceeds the limit. Please upload an image with a size of up to 200kb.');
			return;
		}

		const imageToString = await convertImage(file);
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

	const sendImage = (imageToString: string) => {
		axiosInstance.post(`/users/change-avatar`, { image: imageToString });
	}

	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>Changer d&apos;avatar: glisser une image</h2>
			<ImageDropZone onDrop={onDrop} />
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