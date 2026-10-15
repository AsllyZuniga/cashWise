<div align="center">

# 💸 cashWise

**Gestiona tus finanzas personales de forma simple y eficiente**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Stencil](https://img.shields.io/badge/Web_Components-Stencil-000000?style=flat-square&logo=stencil&logoColor=white)](https://stenciljs.com/)
[![SCSS](https://img.shields.io/badge/SCSS-styles-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)

</div>

---

## 📖 Descripción

**cashWise** es una aplicación web para la **gestión de finanzas personales**. Permite registrar transacciones, establecer presupuestos mensuales y visualizar el estado de tus gastos e ingresos de forma clara e intuitiva.

Integra componentes UI reutilizables como **Web Components** (construidos con Stencil.js), lo que permite una interfaz consistente y modular.

---

## ✨ Funcionalidades

- 📅 **Selector de mes** — navega entre meses para ver tu historial financiero
- 📆 **Selector de año** — filtra el resumen anual desde el header
- 💼 **Presupuesto mensual** — define y guarda el presupuesto del mes mediante un modal
- 💳 **Transacciones** — registra, edita y elimina ingresos y gastos con fecha y valor
- 🃏 **Header con tarjetas informativas** — resumen real de gasto, ahorro y disponible
- 📊 **Gráfico anual** — totales por mes con Recharts
- 🔔 **Notificaciones (toasts)** — feedback de éxito/error sin `alert()`

---

## 📂 Estructura del Proyecto

```
cashWise/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.tsx
│   │   │   ├── header.scss
│   │   │   ├── header.constants.ts
│   │   │   └── headerCards.tsx
│   │   ├── budgetModalForm/
│   │   │   └── budgetModalForm.tsx
│   │   ├── financeChart/
│   │   │   ├── financeChart.tsx
│   │   │   └── financeChart.scss
│   │   ├── monthSelector/
│   │   │   ├── monthSelector.tsx
│   │   │   ├── monthSelector.scss
│   │   │   └── monthSelector.constants.ts
│   │   └── Transactions/
│   │       ├── transaction.tsx
│   │       ├── transactionForm.tsx
│   │       └── transaction.scss
│   ├── config/
│   │   └── axios.ts
│   ├── context/
│   │   ├── FinanceContext.tsx
│   │   ├── ToastContext.tsx
│   │   └── toast.scss
│   ├── models/
│   │   ├── transactions.interface.ts
│   │   ├── transactions.constants.ts
│   │   └── graph.interface.ts
│   ├── services/
│   │   ├── transactions.service.ts
│   │   └── budget.service.ts
│   ├── utils/
│   │   └── currency.ts
│   ├── pages/
│   │   └── dashboard.tsx
│   └── test/
│       └── setup.ts
├── .env.example
├── index.html
├── package.json
├── vite.config.ts
└── eslint.config.js
```

---

## 🧩 Componentes Principales

### `Dashboard`
Vista principal que orquesta el layout de la aplicación:

```tsx
const Dashboard = () => {
  return (
    <>
      <Header />
      <MonthSelector />
      <Transactions />
      <FinanceChart />
    </>
  );
};
```

---

### `FinanceContext`
Estado compartido de la app: mes/año seleccionados, transacciones y totales calculados (ingreso, gasto, ahorro, disponible). Evita que cada componente haga su propio fetch y mantiene el selector de mes/año sincronizado con los datos.

```tsx
const { selectedMonth, selectedYear, setMonth, setYear, totals } = useFinance();
```

---

### `ToastContext`
Reemplaza `alert()`/`confirm()` por notificaciones no bloqueantes y un modal de confirmación:

```tsx
const { showToast, confirm } = useToast();

showToast("Transacción creada exitosamente.", "success");
const accepted = await confirm("¿Seguro que quieres eliminar?");
```

---

### `BudgetModalForm`
Modal para registrar el presupuesto mensual. Usa Web Components (`UiPanelModal`, `UiInput`, `UiButton`) y persiste mediante `budget.service`:

```tsx
<UiInput
  type="number"
  name="value"
  value={form.value}
  onInputChange={(e) => handleChange("value", e.detail)}
/>
```

> Nota: `UiInput` emite `inputChange` (`onInputChange`), mientras que `UiSelect` emite `valueChange` (`onValueChange`).

---

### `MonthSelector`
Selector de mes conectado al `FinanceContext` (el mes activo filtra las transacciones y el resumen).

### `Transactions`
Gestión de transacciones con formulario modal, edición y borrado por `id`.

---

## 🔌 Web Components integrados

cashWise consume componentes del design system propio vía Web Components:

| Componente | Uso en la app |
|------------|---------------|
| `<UiPanelModal>` | Modal de presupuesto, transacciones y confirmación |
| `<UiInput>` | Campos de texto, número y fecha |
| `<UiSelect>` | Selectores de movimiento, método de pago y relación |
| `<UiTable>` | Historial de transacciones |
| `<UiButton>` | Botones de acción (Guardar / Cancelar) |
| `<UiCard>` | Tarjetas del header |

---

## ⚙️ Variables de entorno

Copia `.env.example` a `.env` y ajusta la URL de la API:

```bash
VITE_API_URL=https://localhost:7050/api
```

> `.env` está ignorado por git. Mantén `.env.example` actualizado.

---

## 🚀 Cómo Ejecutar

```bash
# 1. Clona el repositorio
git clone https://github.com/AsllyZuniga/cashWise.git
cd cashWise

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

> Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🧪 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila TypeScript y genera el build de producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm test` | Ejecuta los tests con Vitest |

---

## 🛠️ Stack Tecnológico

| Tecnología | Rol |
|------------|-----|
| **React 19** | Framework principal de UI |
| **TypeScript** | Tipado estático |
| **SCSS** | Estilos por componente |
| **Stencil Web Components** | Sistema de diseño reutilizable |
| **Recharts** | Gráfico de totales anuales |
| **Vitest** | Testing unitario |
| **ESLint** | Calidad y estilo del código |
| **Vite** | Bundler y servidor de desarrollo |

---

<div align="center">

Hecho con 💚 por [AsllyZuniga](https://github.com/AsllyZuniga)

</div>
