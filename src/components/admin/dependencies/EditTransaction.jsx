import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../navbar'
import Sidebar from '../../sideBar'
import { useUpdateTransaction } from '../../../shared/hooks/history/updateUserTransaction'
import '../../../assets/styles/layout.css'
import '../../../assets/styles/editTransaccion.css'

export const EditTransaction = () => {
    const { uid } = useParams()
    const navigate = useNavigate()
    const { updateUserTransaction, loading, error, success } = useUpdateTransaction()
    const [amount, setAmount] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Por favor ingresa un monto válido')
            return
        }

        await updateUserTransaction(uid, { amount: parseFloat(amount) })
    }

    const handleGoBack = () => {
        navigate('/admin/deposits')
    }

    return (
        <div className="layout">
            <Navbar />
            <div className="layout-body">
                <Sidebar />
                <div className="main-content edit-transaction-main-content">
                    <div className="edit-transaction-container">
                        <h2 className="edit-transaction-title">Editar Transacción</h2>
                        <p className="edit-transaction-uid"><strong>UID:</strong> {uid}</p>
                        
                        <form onSubmit={handleSubmit} className="edit-transaction-form">
                            <div className="edit-transaction-form-group">
                                <label htmlFor="amount" className="edit-transaction-label">Monto:</label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Ingresa el nuevo monto"
                                    step="0.01"
                                    min="0"
                                    required
                                    className="edit-transaction-input"
                                />
                            </div>
                            
                            <div className="edit-transaction-form-actions">
                                <button 
                                    type="button" 
                                    onClick={handleGoBack}
                                    className="edit-transaction-btn edit-transaction-btn-secondary"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="edit-transaction-btn edit-transaction-btn-primary"
                                >
                                    {loading ? 'Actualizando...' : 'Actualizar'}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="edit-transaction-error-message">
                                {error}
                            </div>
                        )}
                        
                        {success && (
                            <div className="edit-transaction-success-message">
                                Transacción actualizada exitosamente
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTransaction;