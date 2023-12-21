import React from 'react';

export interface AprendizajeProps {
    className?: string;
}

export const Aprendizaje: React.FC<AprendizajeProps> = ({ className = '' }) => (
    <div className={className}>
        <h1 className=''>hola mundo</h1></div>
);