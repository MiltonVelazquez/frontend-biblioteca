import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import type { PrestamoRequest } from "../../types/models";
import { registrarPrestamo } from "../../services/prestamoService";

const validationSchema = Yup.object({
  idLibro: Yup.number()
    .required("El ID del Libro es obligatorio")
    .positive("El ID debe ser un número positivo")
    .integer("El ID debe ser un número entero"),
  nroSocio: Yup.string()
    .required("El Nro. de Socio es obligatorio")
    .matches(/^SOC-[A-Z0-9]{8}$/, "El formato debe ser SOC-XXXXXXXX"),
});

const PrestamoForm: React.FC = () => {
  const initialValues: PrestamoRequest = {
    idLibro: null,
    nroSocio: "",
  };

  const handleSubmit = async (
    values: PrestamoRequest,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      if (values.idLibro === null) {
        toast.error("Por favor, ingrese un ID de libro válido.");
        setSubmitting(false);
        return;
      }
      const dataToSend: PrestamoRequest = {
        ...values,
        idLibro: values.idLibro,
      };

      const response = await registrarPrestamo(dataToSend);
      toast.success(response.mensaje || "¡Préstamo registrado!");
      resetForm();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Error al registrar el préstamo.";
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
        <Form
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3>Registrar Nuevo Préstamo</h3>

          <div style={{ marginBottom: "10px" }}>
            <label>ID Libro a Prestar: </label>
            <Field
              type="number"
              name="idLibro"
              style={{ width: "300px" }}
              placeholder="Ej: 1"
            />
            <ErrorMessage
              name="idLibro"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Nro. Socio: </label>
            <Field
              type="text"
              name="nroSocio"
              style={{ width: "300px" }}
              placeholder="Ej: SOC-ABC12345"
            />
            <ErrorMessage
              name="nroSocio"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrar Préstamo"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PrestamoForm;
