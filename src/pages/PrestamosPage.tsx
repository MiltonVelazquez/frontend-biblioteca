// src/pages/PrestamosPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { Prestamo } from "../types/models"; // Importa el tipo Prestamo
import {
  getAllPrestamos,
  getAllDevoluciones,
} from "../services/prestamoService"; // Importa los servicios
import PrestamoList from "../components/prestamos/PrestamoList"; // Importa el componente de lista
import PrestamoForm from "../components/prestamos/PrestamoForm";
import DevolucionForm from "../components/prestamos/DevolucionForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Multa, MultaUpdateFormValues } from "../types/models";
import {
  getAllMultas,
  pagarMulta,
  updateMontoMulta,
} from "../services/MultaService";
import MultaList from "../components/multas/MultaList";
const multaValidationSchema = Yup.object({
  monto: Yup.number()
    .positive("El monto debe ser positivo")
    .required("El monto es obligatorio"),
});
function PrestamosPage() {
  const [prestamosActivos, setPrestamosActivos] = useState<Prestamo[]>([]);
  const [historialDevoluciones, setHistorialDevoluciones] = useState<
    Prestamo[]
  >([]);
  const [multasPendientes, setMultasPendientes] = useState<Multa[]>([]);
  const [multasPagadas, setMultasPagadas] = useState<Multa[]>([]);
  const [multaAEditar, setMultaAEditar] = useState<Multa | null>(null);

  const handlePay = async (id: number) => {
    if (
      window.confirm("¿Está seguro de que desea marcar esta multa como pagada?")
    ) {
      try {
        await pagarMulta(id);
        toast.success("¡Multa pagada!");
        cargarDatos();
        setMultaAEditar(null);
      } catch (error) {
        toast.error("Error al pagar la multa.");
        console.error(error);
      }
    }
  };

  const handleEdit = (multa: Multa) => {
    setMultaAEditar(multa);
  };

  const handleUpdateMonto = async (
    values: MultaUpdateFormValues,
    { setSubmitting }: any,
  ) => {
    if (!multaAEditar) return;
    try {
      await updateMontoMulta(multaAEditar.idMulta, values);
      toast.success("Monto actualizado.");
      setMultaAEditar(null);
      cargarDatos();
    } catch (error) {
      toast.error("Error al actualizar el monto.");
      console.error(error);
    }
    setSubmitting(false);
  };


  const cargarDatos = async () => {
    try {
      const resPrestamos = await getAllPrestamos();
      setPrestamosActivos(
        resPrestamos.content.filter((p) => p.fechaDevolucion === null),
      );
      setHistorialDevoluciones(
        resPrestamos.content.filter((p) => p.fechaDevolucion !== null),
      );
      const resMultas = await getAllMultas();
      setMultasPendientes(resMultas.filter((m) => !m.pagada));
      setMultasPagadas(resMultas.filter((m) => m.pagada));
    } catch (error) {
      toast.error("Error al cargar los datos de la página");
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDatos(); 
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Volver al Inicio</Link>
      <h2>Gestión de Préstamos y Devoluciones</h2>

      <PrestamoForm />

      <DevolucionForm />
      <PrestamoList
        prestamos={prestamosActivos}
        titulo="Préstamos Activos (No Devueltos)"
      />

      <PrestamoList
        prestamos={historialDevoluciones}
        titulo="Historial de Devoluciones"
      />

      <hr style={{ margin: "40px 0" }} />
      <h2>Gestión de Multas</h2>

      {multaAEditar && (
        <Formik
          initialValues={{ monto: multaAEditar.monto }}
          validationSchema={multaValidationSchema}
          onSubmit={handleUpdateMonto}
          enableReinitialize
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
              <h3>Editando Multa ID: {multaAEditar.idMulta}</h3>
              <p>Socio: {multaAEditar.socioNombreCompleto}</p>

              <div style={{ marginBottom: "10px" }}>
                <label>Nuevo Monto: $</label>
                <Field type="number" name="monto" />
                <ErrorMessage
                  name="monto"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ marginRight: "10px" }}
              >
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </button>
              <button type="button" onClick={() => setMultaAEditar(null)}>
                Cancelar
              </button>
            </Form>
          )}
        </Formik>
      )}

      <MultaList
        multas={multasPendientes}
        titulo="Multas Pendientes"
        onEdit={handleEdit}
        onPay={handlePay}
      />

      <MultaList multas={multasPagadas} titulo="Historial de Multas Pagadas" />

    </div>
  );
}

export default PrestamosPage;
