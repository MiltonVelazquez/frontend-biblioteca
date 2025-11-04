import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Socio, SocioFormValues, SocioUpdateFormValues } from '../types/models';
import { getAllSocios, createSocio, updateSocio, deleteSocio } from '../services/socioService';
import SocioList from '../components/socios/SocioList';
import SocioForm from '../components/socios/SocioForm';

function SociosPage() {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [socioAEditar, setSocioAEditar] = useState<Socio | null>(null);

  const cargarSocios = async () => {
    try {
      const data = await getAllSocios();
      setSocios(data);
    } catch (error) {
      toast.error('Error al cargar los socios');
      console.error(error);
    }
  };

  useEffect(() => {
    cargarSocios();
  }, []);

  const handleSubmit = async (values: SocioFormValues | SocioUpdateFormValues) => {
    try {
      if (socioAEditar) {
        await updateSocio(socioAEditar.idsocio, values as SocioUpdateFormValues);
      } else {
        await createSocio(values as SocioFormValues);
      }
      setSocioAEditar(null);
      cargarSocios();
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar el socio.');
    }
  };

  const handleEdit = (socio: Socio) => {
    setSocioAEditar(socio);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este socio?')) {
      try {
        await deleteSocio(id);
        toast.success('¡Socio eliminado!');
        cargarSocios();
      } catch (error) {
        toast.error('Error al eliminar el socio.');
        console.error(error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">← Volver al Inicio</Link>
      <h2>Gestión de Socios</h2>

      <SocioForm 
        initialData={socioAEditar} 
        onSubmit={handleSubmit} 
      />
      <SocioList 
        socios={socios} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default SociosPage;