import React, { useState } from "react";
// Hooks
import { useForm } from "react-hook-form";
// Styles
import "./index.scss";

// Components
import UploadImage from "components/CreateCard/UploadImage";
import MessageError from "../MessageError";
import Button from "components/_shared/Button";

const CreateCardForm = ({ createCard, loading }) => {
	const { register, handleSubmit, errors } = useForm();
	console.log(errors);
	const [photo, setPhoto] = useState(null);
	const [imageFileName, setImageFileName] = useState("");

	const onSubmit = async ({ title, description, externalUrl }) => {
		createCard(
			JSON.stringify({
				title,
				description,
				photo,
				externalUrl,
			}),
		);
	};

	const URL_FORMAT = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

	return (
		<form className="CreateCardForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
			<div className="upload-form-container">
				<UploadImage
					photo={photo}
					setPhoto={setPhoto}
					imageFileName={imageFileName}
					setImageFileName={setImageFileName}
				/>
			</div>

			<section className="input">
				<label>Título</label>
				<input
					name="title"
					placeholder="Ingresa un título"
					ref={register({ required: true, maxLength: 50 })}
				/>
				{errors.title && errors.title.type === "required" && <MessageError message="Ingrese un Título" />}
				{errors.title && errors.title.type === "maxLength" && <MessageError message="Máximo 50 caracteres" />}
			</section>

			<section className="input">
				<label>Categorías</label>
				<select className="select" name="categoria">
					<option>Rutinas</option>
					<option>Alimentacion</option>
					<option>Confort</option>
					<option>Salud mental</option>
				</select>
			</section>

			<section className="input">
				<label>Descripción</label>
				<textarea 
					rows="5"
					name="description"
					placeholder="Explicá en que consiste el artículo"
					ref={register({ required: true, minLength: 150 })}>
				</textarea>
				{errors.description && errors.description.type === "minLength" && <MessageError message="Mínimo 150 caracteres" />}
				{errors.description && errors.description.type === "required" && <MessageError message="Ingrese una descripción" />}
			</section>

			<section className="input">
				<label>URL</label>
				<input
					name="externalUrl"
					placeholder="Ingresa una URL"
					ref={register({ required: true, maxLength: 254, pattern: URL_FORMAT })}
				/>
				{errors.externalUrl && errors.externalUrl.type === "required" &&<MessageError message="Ingrese una Url" />}
				{errors.externalUrl && errors.externalUrl.type === "maxLength" && <MessageError message="Máximo 250 caracteres" />}
				{errors.externalUrl && errors.externalUrl.type === "pattern" && <MessageError message="Ingrese una Url válida" />}
			</section>

			<Button type="submit">
				{loading ? "Subiendo..." : "Agregar articulo"}
			</Button>
		</form>
	);
};
export default CreateCardForm;
