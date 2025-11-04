import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { Libro, LibroFormValues } from '../../types/models';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  titulo: Yup.string().required('El título es obligatorio'),
  autor: Yup.string().required('El autor es obligatorio'),
  isbn: Yup.string().required('El ISBN es obligatorio'),
  estado: Yup.string().required('El estado es obligatorio (Ej: Disponible, Prestado)'),
});

interface Props {
  initialData: Libro | null;
  onSubmit: (values: LibroFormValues) => Promise<void>;
}

const LibroForm: React.FC<Props> = ({ initialData, onSubmit }) => {

  const initialValues: LibroFormValues = {
    titulo: initialData?.titulo || '',
    autor: initialData?.autor || '',
    isbn: initialData?.isbn || '',
    estado: initialData?.estado || 'Disponible',
  };

  const handleSubmit = async (values: LibroFormValues, { setSubmitting, resetForm }: any) => {
    try {
      await onSubmit(values); 
      resetForm();
      toast.success(initialData ? '¡Libro actualizado!' : '¡Libro creado!');
    } catch (error) {
      toast.error('Error al guardar el libro.');
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, resetForm }) => (
        <Form style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h3>{initialData ? 'Editar Libro' : 'Crear Nuevo Libro'}</h3>

          <div style={{ marginBottom: '10px' }}>
            <label>Título: </label>
            <Field type="text" name="titulo" style={{ width: '300px' }} />
            <ErrorMessage name="titulo" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Autor: </label>
            <Field type="text" name="autor" style={{ width: '300px' }} />
            <ErrorMessage name="autor" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>ISBN: </label>
            <Field type="text" name="isbn" style={{ width: '300px' }} />
            <ErrorMessage name="isbn" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Estado: </label>
            <Field type="text" name="estado" style={{ width: '300px' }} />
            <ErrorMessage name="estado" component="div" style={{ color: 'red' }} />
          </div>

          <button type="submit" disabled={isSubmitting} style={{ marginRight: '10px' }}>
            {isSubmitting ? 'Guardando...' : (initialData ? 'Actualizar' : 'Crear')}
          </button>

          {/* Si estamos editando, mostramos un botón para cancelar/limpiar */}
          {initialData && (
            <button type="button" onClick={() => resetForm({ values: initialValues })}>
              Cancelar Edición
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LibroForm;