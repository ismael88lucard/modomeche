import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// --- IMPORTACIONES DE IMÁGENES ---
import v220 from './assets/img/220v.jpeg'; 
import anthony from './assets/img/anthony.jpeg';
import antioqueno from './assets/img/antioquenio.jpeg';
import corona from './assets/img/corona.jpeg'; 
import cubata from './assets/img/cubata.jpeg';
import hotamarindo from './assets/img/hotamarindo.jpeg';
import lark from './assets/img/lark.jpeg'; 
import nortenio from './assets/img/nortenio.jpeg';
import oldtimes from './assets/img/oldtimes.jpeg';
import ronabuelo from './assets/img/ronabuelo.jpeg'; 
import sevencolors from './assets/img/sevencolors.jpeg';
import switchs from './assets/img/switch.jpeg';
import zhumir from './assets/img/zhumir.jpeg'; 
import zhumirmango from './assets/img/zhumirmango.jpeg';
import zhumirnaranjilla from './assets/img/zhumirnaranjilla.jpeg';
import zhumirpink from './assets/img/zhumirpink.jpeg'; 
import zhumirtamarindo from './assets/img/zhumirtamarindo.jpeg';
import zhumircoco from './assets/img/zhumircoco.jpeg';

// --- CONFIGURACIÓN DE PRODUCTOS ---
const productos = [
  { id: 1, nombre: 'Antioqueño Azul', precio: '15.00', medida: '750ml', img: antioqueno },
  { id: 2, nombre: 'Norteño Bote', precio: '7.30', medida: '750ml', img: nortenio },
  { id: 3, nombre: 'Ron Abuelo Botella', precio: '13.00', medida: '750ml', img: ronabuelo },
  { id: 4, nombre: 'Old Times Apple', precio: '7.00', medida: '750ml', img: oldtimes },
  { id: 5, nombre: 'Cerveza Corona', precio: '1.75', medida: 'Unidad', img: corona },
  { id: 6, nombre: 'Zhumir Tamarindo', precio: '5.00', medida: '750ml', img: zhumirtamarindo },
  { id: 7, nombre: 'Zhumir Pink Citrus', precio: '5.00', medida: '750ml', img: zhumirpink },
  { id: 8, nombre: 'Zhumir Naranjilla', precio: '5.00', medida: '750ml', img: zhumirnaranjilla },
  { id: 9, nombre: 'Zhumir Mango', precio: '5.00', medida: '750ml', img: zhumirmango },
  { id: 10, nombre: 'Zhumir Durazno', precio: '5.00', medida: '750ml', img: zhumir },
  { id: 11, nombre: 'Zhumir Coco', precio: '5.00', medida: '750ml', img: zhumircoco },
  { id: 12, nombre: 'Cubata Berrylicious', precio: '3.25', medida: '300ml', img: cubata },
  { id: 13, nombre: 'Switch Bongo Bongo', precio: '3.50', medida: 'Unidad', img: switchs },
  { id: 14, nombre: 'Vino Anthony Mora', precio: '8.50', medida: '750ml', img: anthony },
  { id: 15, nombre: 'Vino Anthony Frambuesa', precio: '8.50', medida: '750ml', img: anthony },
  { id: 16, nombre: 'Cristal Tamarindo', precio: '5.50', medida: '750ml', img: hotamarindo },
  { id: 17, nombre: 'Vodka Seven Colors', precio: '4.00', medida: '700ml', img: sevencolors },
  { id: 18, nombre: 'Energizante V220', precio: '1.10', medida: '600ml', img: v220 },
  { id: 19, nombre: 'Lark', precio: '0.50', medida: 'Unidad', img: lark },
];

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [esHorarioEspecial, setEsHorarioEspecial] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Lógica de Horario
  useEffect(() => {
    const checkHora = () => {
      const hora = new Date().getHours();
      setEsHorarioEspecial(hora >= 22 || hora < 6);
    };
    checkHora();
    const interval = setInterval(checkHora, 60000);
    return () => clearInterval(interval);
  }, []);

  const calcularPrecio = (precioBase) => {
    const num = parseFloat(precioBase);
    return esHorarioEspecial ? (num * 1.20).toFixed(2) : num.toFixed(2);
  };

  // --- SOLUCIÓN AL ERROR DE PUREZA ---
  const agregarAlCarrito = (prod) => {
    // Calculamos el precio fuera del updater
    const precioFinal = calcularPrecio(prod.precio);
    
    // Usamos el estado anterior para inyectar el ID de forma que React no lo vea como una "impureza de render"
    setCarrito((prevItems) => {
      const idUnico = crypto.randomUUID 
        ? crypto.randomUUID() 
        : `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      return [...prevItems, { ...prod, cartId: idUnico, precioFinal }];
    });
  };

  const eliminarDelCarrito = (cartId) => {
    setCarrito(prev => prev.filter(item => item.cartId !== cartId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setIsCartOpen(false);
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + parseFloat(item.precioFinal), 0).toFixed(2);

  const enviarWhatsApp = () => {
    const numero = "593999911398"; // Tu número
    let mensaje = `*PEDIDO MODO MECHE*%0A------------------------- %0A`;
    carrito.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.nombre} - $${item.precioFinal}%0A`;
    });
    mensaje += `------------------------- %0A*TOTAL: $${totalCarrito}*%0A%0A_Enviado desde el catálogo web._`;
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-6 font-sans selection:bg-[#ff007f] selection:text-white">
      
      {/* Fondo Neon */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ff007f]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Alerta de Tarifa */}
      <AnimatePresence>
        {esHorarioEspecial && (
          <motion.div 
            initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
            className="fixed top-6 z-[100] bg-[#ff007f] px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,0,127,0.5)]"
          >
            🌙 Tarifa Nocturna Activada (+20%)
          </motion.div>
        )}
      </AnimatePresence>

      <header className="text-center mb-16 relative z-10 pt-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <div className="absolute inset-0 bg-[#ff007f]/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="relative">
            <span className="block text-5xl md:text-7xl font-light italic text-[#ff007f] tracking-wide" style={{ fontFamily: 'serif' }}>Modo</span>
            <span className="block text-7xl md:text-9xl font-extrabold tracking-[0.15em] uppercase leading-none bg-gradient-to-b from-white via-[#ff007f] to-[#ff007f] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,0,127,0.5)]">Meche</span>
          </motion.h1>
          <p className="tracking-[0.8em] text-zinc-400 mt-6 text-[10px] md:text-xs uppercase font-light opacity-80">
            Licores <span className="text-[#ff007f] mx-2">•</span> Calidad <span className="text-[#ff007f] mx-2">•</span> Precio
          </p>
        </motion.div>
      </header>

      {/* Productos */}
      <section className="w-full max-w-7xl px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {productos.map((prod) => (
            <motion.div key={prod.id} whileHover={{ y: -12 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group flex flex-col bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-6 transition-all duration-500 hover:border-[#ff007f]/40">
              <div className="relative w-full h-80 rounded-[2.5rem] bg-gradient-to-b from-zinc-800/50 to-transparent flex items-center justify-center overflow-hidden mb-6">
                <img src={prod.img} alt={prod.nombre} className="h-full w-auto object-contain p-6 drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex flex-col flex-grow px-2">
                <h3 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-[#ff007f] transition-colors duration-300 uppercase italic">{prod.nombre}</h3>
                <div className="mt-auto pt-6 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">{esHorarioEspecial ? "Precio Nocturno" : "Precio Especial"}</span>
                    <p className="text-3xl font-black text-white group-hover:text-[#ff007f] transition-colors"><span className="text-sm font-normal mr-1">$</span>{calcularPrecio(prod.precio)}</p>
                  </div>
                  <span className="mb-1 px-4 py-1.5 rounded-full bg-zinc-800/80 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{prod.medida}</span>
                </div>
              </div>
              <button onClick={() => agregarAlCarrito(prod)} className="w-full mt-8 bg-white text-black font-black py-4 rounded-2xl transition-all duration-300 hover:bg-[#ff007f] hover:text-white flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-black/40">
                + AGREGAR
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Botón Flotante Carrito */}
      <AnimatePresence>
        {carrito.length > 0 && !isCartOpen && (
          <motion.button 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 z-[100] bg-[#ff007f] text-white p-6 rounded-full shadow-2xl flex items-center justify-center"
          >
            <div className="absolute -top-2 -right-2 bg-white text-[#ff007f] w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 border-[#ff007f]">
              {carrito.length}
            </div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel del Carrito */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900 z-[120] p-8 shadow-2xl flex flex-col border-l border-white/10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Tu Pedido</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white uppercase text-xs font-bold transition-colors">Cerrar ✕</button>
              </div>

              <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                {carrito.map((item) => (
                  <div key={item.cartId} className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center p-2">
                        <img src={item.img} className="w-full h-full object-contain" alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-xs uppercase text-zinc-300">{item.nombre}</p>
                        <p className="text-[#ff007f] font-black text-lg">${item.precioFinal}</p>
                      </div>
                    </div>
                    <button onClick={() => eliminarDelCarrito(item.cartId)} className="text-zinc-600 hover:text-red-500 transition-colors p-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex justify-between items-end mb-6 px-2">
                  <span className="text-zinc-500 uppercase font-bold text-xs">Total:</span>
                  <span className="text-4xl font-black text-[#ff007f]">${totalCarrito}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={vaciarCarrito} className="py-4 rounded-2xl bg-zinc-800 text-zinc-400 font-bold uppercase text-[10px]">Vaciar</button>
                  <button onClick={enviarWhatsApp} className="py-4 rounded-2xl bg-[#25D366] text-white font-black uppercase text-[10px] flex items-center justify-center gap-2">Pedir</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="mt-20 mb-10 opacity-30 text-[10px] tracking-widest uppercase">
        Modo Meche © 2026
      </footer>
    </div>
  );
}