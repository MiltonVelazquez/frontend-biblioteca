import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import type { DevolucionRequest } from '../../types/models';
import { registrarDevolucion } from '../../services/prestamoService';

const validationSchema = Yup.object({
  idLibro: Yup.number()
    .required('El ID del Libro es obligatorio')
    .positive('El ID debe ser un número positivo')
    .integer('El ID debe ser un número entero'),
    .required('El Nro. de Socio es obligatorio')
    .matches(/^SOC-[A-Z0-9]{8}$/, 'El formato debe ser SOC-XXXXXXXX'),
});

const DevolucionForm: React.FC = () => {
  const initialValues: DevolucionRequest = {
    idLibro: null,
    nroSocio: '',
    buenasCondiciones: true,
  };

  const handleSubmit = async (values: DevolucionRequest, { setSubmitting, resetForm }: any) => {
    try {
       if (values.idLibro === null) {
          toast.error("Por favor, ingrese un ID de libro válido.");
          setSubmitting(false);
          return;
      }
       const dataToSend: DevolucionRequest = {
          ...values,
          idLibro: values.idLibro
      }

      const response = await registrarDevolucion(dataToSend);
      toast.success(response.mensaje || '¡Devolución registrada!');
      resetForm();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al registrar la devolución.';
      toast.error(errorMessage);
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h3>Registrar Devolución</h3>

          <div style={{ marginBottom: '10px' }}>
            <label>ID Libro a Devolver: </label>
            <Field type="number" name="idLibro" style={{ width: '300px' }} placeholder="Ej: 1" />
            <ErrorMessage name="idLibro" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Nro. Socio que devuelve: </label>
            <Field type="text" name="nroSocio" style={{ width: '300px' }} placeholder="Ej: SOC-ABC12345" />
            <ErrorMessage name="nroSocio" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>
              <Field type="checkbox" name="buenasCondiciones" />
              ¿El libro se devolvió en buenas condiciones?
            </label>
            <ErrorMessage name="buenasCondiciones" component="div" style={{ color: 'red' }} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrar Devolución'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DevolucionForm;