import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFinance } from "../../context/financeContext";
import { fetchGraphTotals } from "../../services/transactions.service";
import { MonthlyTotal } from "../../models/graph.interface";
import { MONTH_LABELS } from "../../models/transactions.constants";
import { getErrorMessage } from "../../config/axios";
import { useToast } from "../../context/toastContext";
import "./financeChart.scss";

interface ChartPoint {
  name: string;
  total: number;
}

const toChartData = (totals: MonthlyTotal[]): ChartPoint[] =>
  MONTH_LABELS.map((label, index) => {
    const month = index + 1;
    const match = totals.find((item) => item.month === month);
    return { name: label, total: match?.total ?? 0 };
  });

export default function FinanceChart() {
  const { selectedYear } = useFinance();
  const { showToast } = useToast();
  const [data, setData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchGraphTotals(selectedYear)
      .then((totals) => {
        if (active) setData(toChartData(totals));
      })
      .catch((error) => {
        if (active) {
          setData([]);
          showToast(
            `No se pudo cargar el gráfico: ${getErrorMessage(error)}`,
            "error"
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedYear, showToast]);

  return (
    <section className="finance-chart">
      <h2 className="finance-chart__title">Resumen anual {selectedYear}</h2>

      {loading ? (
        <p>Cargando gráfico...</p>
      ) : (
        <div className="finance-chart__container">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="total" fill="#678f51" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
