import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { Socio, SocioFormValues } from '../../types/models';
import { toast } from 'react-toastify';
import { checkDniExists } from '../../services/socioService';

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  dni: Yup.string()
    .matches(/^[0-9]{7,8}$/, 'El DNI debe tener 7 u 8 dígitos')
    .required('El DNI es obligatorio')
    .test('checkDni', 'Ese DNI ya está registrado', async (value) => {
      if (value && value.match(/^[0-9]{7,8}$/)) {
        const response = await checkDniExists(value);
        return !response.existe; 
      }
      return true;
    }),
});

const updateValidationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  dni: Yup.string().notRequired(), 
});

interface Props {
  initialData: Socio | null;
  onSubmit: (values: SocioFormValues | { nombre: string; apellido: string }) => Promise<void>;
}

const SocioForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const isCreating = !initialData;

  const initialValues: SocioFormValues = {
    nombre: initialData?.nombre || '',
    apellido: initialData?.apellido || '',
    dni: initialData?.dni || '',
  };

  const handleSubmit = async (values: SocioFormValues, { setSubmitting, resetForm }: any) => {
    try {

      if (isCreating) {
        await onSubmit(values);
      } else {
        await onSubmit({ nombre: values.nombre, apellido: values.apellido });
      }
      resetForm();
      toast.success(isCreating ? '¡Socio creado!' : '¡Socio actualizado!');
    } catch (error: any) {
      toast.error(`Error: ${error.message || 'No se pudo guardar el socio.'}`);
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isCreating ? validationSchema : updateValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, resetForm, dirty, isValid }) => (
        <Form style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h3>{isCreating ? 'Registrar Nuevo Socio' : 'Editar Socio'}</h3>

          <div style={{ marginBottom: '10px' }}>
            <label>Nombre: </label>
            <Field type="text" name="nombre" style={{ width: '300px' }} />
            <ErrorMessage name="nombre" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Apellido: </label>
            <Field type="text" name="apellido" style={{ width: '300px' }} />
            <ErrorMessage name="apellido" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>DNI: </label
            <Field type="text" name="dni" style={{ width: '300px' }} disabled={!isCreating} />
            <ErrorMessage name="dni" component="div" style={{ color: 'red' }} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !dirty || !isValid}
            style={{ marginRight: '10px' }}
          >
            {isSubmitting ? 'Guardando...' : (isCreating ? 'Registrar' : 'Actualizar')}
          </button>

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

export default SocioForm;