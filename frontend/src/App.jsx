import { useState, useEffect } from 'react'

export default function App() {
  const [cvTexto, setCvTexto] = useState('')
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [historial, setHistorial] = useState([])
  const [vista, setVista] = useState('analizar')

  useEffect(() => {
    cargarHistorial()
  }, [])

  async function cargarHistorial() {
    const response = await fetch('https://cv-analyzer-production.up.railway.app/historial')
    const data = await response.json()
    setHistorial(data)
  }

  async function analizarCV() {
    if (!cvTexto.trim()) return
    setCargando(true)
    setResultado(null)

    const response = await fetch('https://cv-analyzer-production.up.railway.app/analizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cv_texto: cvTexto })
    })

    const data = await response.json()
    setResultado(data)
    setCargando(false)
    cargarHistorial()
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">CV Analyzer 🤖</h1>
          <p className="text-gray-500 text-sm">Analiza tu CV con Inteligencia Artificial</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setVista('analizar')}
            className={`px-4 py-2 rounded-lg font-medium ${vista === 'analizar' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Analizar
          </button>
          <button
            onClick={() => setVista('historial')}
            className={`px-4 py-2 rounded-lg font-medium ${vista === 'historial' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Historial
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">

        {vista === 'analizar' && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Pega tu CV aquí</h2>
              <p className="text-gray-500 text-sm mb-4">Copia y pega el texto completo de tu CV</p>
              <textarea
                className="w-full h-48 border border-gray-200 rounded-lg p-4 text-gray-700 resize-none focus:outline-none focus:border-blue-400"
                placeholder="Escribe o pega tu CV aquí..."
                value={cvTexto}
                onChange={(e) => setCvTexto(e.target.value)}
              />
              <button
                onClick={analizarCV}
                disabled={cargando}
                className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 font-medium"
              >
                {cargando ? 'Analizando...' : 'Analizar CV ✨'}
              </button>
            </div>

            {resultado && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Resultado del análisis</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {resultado.resultado}
                </div>
                <p className="text-gray-400 text-xs mt-4">
                  Analizado el {new Date(resultado.fecha).toLocaleString()}
                </p>
              </div>
            )}
          </>
        )}

        {vista === 'historial' && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Historial de análisis</h2>
            {historial.length === 0 ? (
              <p className="text-gray-500">No hay análisis todavía.</p>
            ) : (
              historial.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
                  <p className="text-gray-400 text-xs mb-2">
                    Análisis #{item.id} — {new Date(item.fecha).toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.cv_texto}</p>
                  <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                    {item.resultado}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}