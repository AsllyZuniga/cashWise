<div align="center">

# 💸 cashWise

**Gestiona tus finanzas personales de forma simple y eficiente**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Stencil](https://img.shields.io/badge/Web_Components-Stencil-000000?style=flat-square&logo=stencil&logoColor=white)](https://stenciljs.com/)
[![SCSS](https://img.shields.io/badge/SCSS-styles-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)
![Commits](https://img.shields.io/badge/commits-23-blue?style=flat-square)

</div>

---

## 📖 Descripción

**cashWise** es una aplicación web para la **gestión de finanzas personales**. Permite registrar transacciones, establecer presupuestos mensuales y visualizar el estado de tus gastos e ingresos de forma clara e intuitiva.

Integra componentes UI reutilizables como **Web Components** (construidos con Stencil.js), lo que permite una interfaz consistente y modular.

---

## ✨ Funcionalidades

- 📅 **Selector de mes** — navega entre meses para ver tu historial financiero
- 💼 **Presupuesto mensual** — define y guarda el presupuesto del mes mediante un modal
- 💳 **Transacciones** — registra ingresos y gastos con fecha y valor
- 🃏 **Header con tarjetas informativas** — resumen visual del estado financiero

---

## 📂 Estructura del Proyecto

```
cashWise/
├── public/
├── src/
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.tsx              # Componente principal del header
│   │   │   ├── header.scss
│   │   │   ├── header.constants.ts     # Constantes del header
│   │   │   └── headerCards.tsx         # Tarjetas de resumen financiero
│   │   ├── budgetModalForm/
│   │   │   └── budgetModalForm.tsx     # Modal para agregar presupuesto
│   │   ├── monthSelector/
│   │   │   ├── monthSelector.tsx       # Selector de mes
│   │   │   ├── monthSelector.scss
│   │   │   └── monthSelector.constansts.ts
│   │   └── Transactions/
│   │       ├── transaction.tsx         # Componente de transacciones
│   │       ├── transactionForm.tsx     # Formulario de nueva transacción
│   │       └── transaction.scss
├── index.html
├── package.json
├── tsconfig.json
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
      <main></main>
    </>
  );
};
```

---

### `BudgetModalForm`
Modal para registrar el presupuesto mensual. Usa Web Components (`UiPanelModal`, `UiInput`, `UiButton`) y manejo de estado con `useState`:

```tsx
const [form, setForm] = useState<FormState>({ value: "", date: "" });

const handleChange = (field: keyof FormState, newValue: string) => {
  setForm((prev) => ({ ...prev, [field]: newValue }));
};
```

```tsx
<UiPanelModal visible={isOpen}>
  <UiInput type="number" name="value" value={form.value}
    onValueChange={(e) => handleChange(e.detail.name, e.detail.value)} />
  <UiInput type="date" name="date" value={form.date}
    onValueChange={(e) => handleChange(e.detail.name, e.detail.value)} />
  <UiButton onClick={handleSave}>Guardar</UiButton>
</UiPanelModal>
```

---

### `MonthSelector`
Selector de mes extraído del header como componente independiente, con sus propias constantes y estilos SCSS.

### `Transactions`
Gestión de transacciones con formulario modal para añadir nuevos registros y vista de historial.

---

## 🔌 Web Components integrados

cashWise consume componentes del design system propio vía Web Components:

| Componente | Uso en la app |
|------------|---------------|
| `<UiPanelModal>` | Modal de presupuesto y transacciones |
| `<UiInput>` | Campos de valor y fecha en formularios |
| `<UiButton>` | Botones de acción (Guardar / Cancelar) |

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

## 🛠️ Stack Tecnológico

| Tecnología | Rol |
|------------|-----|
| **React 18+** | Framework principal de UI |
| **TypeScript** | Tipado estático |
| **SCSS** | Estilos por componente |
| **Stencil Web Components** | Sistema de diseño reutilizable |
| **ESLint** | Calidad y estilo del código |
| **Vite** | Bundler y servidor de desarrollo |

---

<div align="center">

Hecho con 💚 por [AsllyZuniga](https://github.com/AsllyZuniga)

</div>
