import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Sale } from "../../models/sale";
import { BASE_URL } from "../../utils/request";

import NotificationButton from "../NotificationButton";
import "./styles.css";

const SalesCard = () => {
	// no minDate, criar uma data de 1 ano atrás
	const min = new Date(new Date().setDate(new Date().getDate() - 365));
	const max = new Date();

	const [minDate, setMinDate] = useState(min);
	const [maxDate, setMaxDate] = useState(max);

	// Tipar o useState - informar o tipo que vai ser o dado - Lista de Sale ( Sale[])
	const [sales, setSales] = useState<Sale[]>([]);

	useEffect(() => {
		axios.get(`${BASE_URL}/sales`).then((response) => {
			setSales(response.data.content);
		});
	}, []);

	return (
		<div className="dsmeta-card">
			<h2 className="dsmeta-sales-title">Vendas</h2>
			<div>
				<div className="dsmeta-form-control-container">
					<DatePicker
						selected={minDate}
						onChange={(date: Date) => setMinDate(date)}
						className="dsmeta-form-control"
						dateFormat="dd/MM/yyyy"
					/>
				</div>
				<div className="dsmeta-form-control-container">
					<DatePicker
						selected={maxDate}
						onChange={(date: Date) => setMaxDate(date)}
						className="dsmeta-form-control"
						dateFormat="dd/MM/yyyy"
					/>
				</div>
			</div>

			<div>
				<table className="dsmeta-sales-table">
					<thead>
						<tr>
							<th className="show992px">ID</th>
							<th className="show576px">Data</th>
							<th>Vendedor</th>
							<th className="show992px">Visitas</th>
							<th className="show992px">Vendas</th>
							<th>Total</th>
							<th>Notificar</th>
						</tr>
					</thead>
					<tbody>
						{sales.map((sale) => {
							return (
								<tr key={sale.id}>
									<td className="show992px">{sale.id}</td>
									{/* Formatar a data   */}
									<td className="show576px">
										{new Date(sale.date).toLocaleDateString()}
									</td>
									{/* <td className="show576px">{sale.date}</td> */}
									<td>{sale.sellerName}</td>
									<td className="show992px">{sale.visited}</td>
									<td className="show992px">{sale.deals}</td>
									{/* Formatar para aparecer 2 casas decimais */}
									<td>R$ {sale.amount.toFixed(2)}</td>
									<td>
										<div className="dsmeta-red-btn-container">
											<NotificationButton />
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SalesCard;
